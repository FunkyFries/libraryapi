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

bookSchema.index({
  "fields.100.1_.a": "text",
  "fields.245.10.a": "text",
  "fields.245.10.c": "text",
  "fields.264._1.b": "text",
  "fields.490.1_.a": "text",
  "fields.520.__.a": "text",
  "fields.650._0.a": "text",
  "fields.655._7.a": "text",
  "fields.700.1_.a": "text",
  "fields.800.1_.a": "text"
});

const Book = mongoose.model("Book", bookSchema);

module.exports = { Book };
