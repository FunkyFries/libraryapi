const express = require("express");
const { Book } = require("../models/book");
const router = express.Router();

// function ensureAuthenticated(req, res, next) {
//   if (req.isAuthenticated()) {
//     return next();
//   }
//   res.redirect("/");
// }

async function searchByQuery(query, field, subfieldA, subfieldB) {
  books = await Book.find({ $text: { $search: `\"${query}\"` } });
  let filteredBooks = [];
  for (let i = 0; i < books.length; i++) {
    for (let j = 0; j < books[i].fields.length; j++) {
      if (books[i].fields[j][field]) {
        if (books[i].fields[j][field][subfieldA]) {
          if (
            books[i].fields[j][field][subfieldA][subfieldB]
              .toLowerCase()
              .includes(query.toLowerCase())
          ) {
            filteredBooks.push(books[i]);
          }
        }
      }
    }
  }
  books = filteredBooks;
  return books;
}

// Search by:
// Anywhere search done
// Barcode 852.__.p exact search done
// ISBN 020.__.a exact search done
// Call number 852.__.h + 852__.i  exact search done
// Title 245.10.a search *Test once all documents are loaded. Might need to replace with RegEx*
// Author 100.1_.a search done
// Subject 650._0.a search done
// Publisher 264._1.b search done
// Genre 655._7.a search done
// Series 490.1_.a search done
// Reading level 526.0_.c filter done

//Full Text Search Fields: 100.1_.a, 245.10.a, 245.10.c, 264._1.b, 490.1_.a, 520.__.a, 650._0.a, 655._7.a, 700.1_.a, 800.1_.a,

// Search for books
router.get("/", async (req, res) => {
  let books;

  // Return all books in collection
  if (req.query.any === "*") {
    books = await Book.find();
    // Search any text fields for query and sort by textScore
  } else if (req.query.any) {
    books = await Book.find(
      {
        $text: { $search: `\"${req.query.any}\"` }
      },
      { score: { $meta: "textScore" } }
    ).sort({ score: { $meta: "textScore" } });
    // Search for books by ISBN number
  } else if (req.query.isbn) {
    books = await Book.find({ "fields.020.__.a": req.query.isbn });
    // Search for books by Call Number
  } else if (req.query.call) {
    let callNumberArray = req.query.call.split(" ");
    books = await Book.find({
      "fields.852.__.h": `${callNumberArray[0]}`,
      "fields.852.__.i": `${callNumberArray[1]}`
    });
    // Search for books by Barcode
  } else if (req.query.bar) {
    books = await Book.find({
      "fields.852.__.p": req.query.bar
    });
    // Search for books by Title
  } else if (req.query.title) {
    books = await searchByQuery(req.query.title, "245", "10", "a");
    // Search for books by Author
  } else if (req.query.author) {
    books = await searchByQuery(req.query.author, "100", "1_", "a");
    // Search for books by Publisher
  } else if (req.query.publisher) {
    books = await searchByQuery(req.query.publisher, "264", "_1", "b");
    // Search for books by Series
  } else if (req.query.series) {
    books = await searchByQuery(req.query.series, "490", "1_", "a");
    // Search for books by Genre
  } else if (req.query.genre) {
    let genreBooks = await searchByQuery(req.query.genre, "655", "_7", "a");
    books = [];
    genreBooks.map(book => {
      let found = books.some(el => el._id.toString() === book._id.toString());
      if (!found) books.push(book);
    });
    // Search for books by Subject
  } else if (req.query.subject) {
    let subjectBooks = [
      ...(await searchByQuery(req.query.subject, "650", "_0", "a")),
      ...(await searchByQuery(req.query.subject, "650", "_1", "a"))
    ];
    books = [];
    subjectBooks.map(book => {
      let found = books.some(el => el._id.toString() === book._id.toString());
      if (!found) books.push(book);
    });
  }

  if ((req.query.rangeMin || req.query.rangeMax) && books) {
    let min = req.query.rangeMin || 0;
    let max = req.query.rangeMax || 13;
    let filteredBooks = [];

    for (let i = 0; i < books.length; i++) {
      for (let j = 0; j < books[i].fields.length; j++) {
        if (books[i].fields[j]["526"]) {
          if (books[i].fields[j]["526"]["0_"]) {
            if (
              books[i].fields[j]["526"]["0_"]["c"] >= min &&
              books[i].fields[j]["526"]["0_"]["c"] <= max
            ) {
              filteredBooks.push(books[i]);
            }
          }
        }
      }
    }
    books = filteredBooks;
  }

  const data = { books };
  res.send(data);
});

// Get one book
router.get("/:id", async (req, res) => {
  const book = await book.findById(req.params.id);

  if (!book) return res.status(404).send("book not found.");

  res.send(book);
});

// Create a new book
router.post("/", async (req, res) => {
  // const { error } = validatebook(req.body);
  // if (error) return res.status(400).send(error.details[0].message);

  const book = new Book({
    leader: req.body.leader,
    fields: req.body.fields
  });
  await book.save();
  res.send(book);
});

// Update book
router.put("/:id", async (req, res) => {
  // const { error } = validateUpdate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const book = await Book.findOneAndUpdate({ _id: req.params.id }, req.body, {
    new: true
  });

  if (!book) return res.status(404).send("book not found.");

  res.send(book);
});

// Delete book
router.delete("/:id", async (req, res) => {
  const book = await Book.findOneAndRemove({ _id: req.params.id });

  if (!book) return res.status(404).send("book not found.");

  res.send(book);
});

module.exports = router;
