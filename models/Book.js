const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true
    },
    pages: {
        type: Number,
        min: 0
    },
    year: {
        type: Number,
        min: 0,
        max: (new Date).getFullYear()
    }
})

const Book = mongoose.model("Book", BookSchema);

module.exports = Book;