const mongoose = require("mongoose");

const Book = mongoose.model(
  "Book",
  new mongoose.Schema({
    leader: {
      type: String,
      required: true
    },
    fields: {
      type: Array,
      required: true
    }
  })
);

module.exports = Book;
