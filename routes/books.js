const express = require("express");
const { Book } = require("../models/book");
const router = express.Router();

// function ensureAuthenticated(req, res, next) {
//   if (req.isAuthenticated()) {
//     return next();
//   }
//   res.redirect("/");
// }

// Search by:
// Anywhere search
// Barcode 852.__.p exact
// Title 245.10.a search
// Author 100.1_.a search
// Subject 650._0.a search
// Reading level 526.0_.c exact
// Publisher 264._1.b search
// Genre 655._7.a search
// Series 490.1_.a search
// ISBN 020.__.a exact
// Call number 852.__.h + 852__.i  exact

//Full Text Search Fields: 100.1_.a, 245.10.a, 245.10.c, 264._1.b, 490.1_.a, 520.__.a, 650._0.a, 655._7.a, 700.1_.a, 800.1_.a,

// Get all books
router.get("/", async (req, res) => {
  const books = await Book.find({
    $text: { $search: "Police" }
    // "fields.245.10.a": "Dog Man unleashed /"
  });
  if (req.query.any != "undefined") {
    const result = Book.find();
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
