const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  leader: {
    type: String,
    required: true
  },
  fields: {
    type: Array,
    required: true,
    index: true
  }
});

// ISBN 020.__.a exact search
// Call number 852.__.h + 852__.i  exact search
// Barcode 852.__.p exact search
// Title 245.10.a fuzzy search
// Author 100.1_.a fuzzy search
// Subject 650._0.a fuzzy search
// Publisher 264._1.b fuzzy search
// Genre 655._7.a fuzzy search
// Series 490.1_.a fuzzy search
// Reading level 526.0_.c filter

// Anywhere search index
bookSchema.index({
  "fields.020.__.a": "text",
  "fields.100.1_.a": "text",
  "fields.245.10.a": "text",
  "fields.245.10.c": "text",
  "fields.264._1.b": "text",
  "fields.490.1_.a": "text",
  "fields.520.__.a": "text",
  "fields.650._0.a": "text",
  "fields.650._1.a": "text",
  "fields.655._7.a": "text",
  "fields.700.1_.a": "text",
  "fields.800.1_.a": "text",
  "fields.852.__.h": "text",
  "fields.852.__.p": "text"
});

// ISBN search index
bookSchema.index({
  "fields.020.__.a": -1
});

// Call Number Index 1
bookSchema.index({
  "fields.852.__.h": -1
});

// Call Number Index 2
bookSchema.index({
  "fields.852.__.i": -1
});

const Book = mongoose.model("Book", bookSchema);

module.exports = { Book };
