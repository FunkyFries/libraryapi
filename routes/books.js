const express = require("express");
const { Book } = require("../models/book");
const router = express.Router();

// function ensureAuthenticated(req, res, next) {
//   if (req.isAuthenticated()) {
//     return next();
//   }
//   res.redirect("/");
// }

// Get all books
router.get("/", async (req, res) => {
  const books = await Book.find({}).sort("name");
  const data = { books };
  res.send(data);
});

// Get one book
router.get("/:id", ensureAuthenticated, async (req, res) => {
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
