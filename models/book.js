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


  (245.1).a,
  (245.1).c,
  (264._1).b,
  (490.1_).a,
  (520.__).a,
  (650._0).a,
  (655._7).a,
  (700.1_).a,
  (800.1_).a;

bookSchema.index({ "fields.100.1_.a": "text", "fields.245."});

const Book = mongoose.model("Book", bookSchema);

module.exports = { Book };
