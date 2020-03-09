const express = require("express");
const mongoose = require("mongoose");
const Book = require("../models/Book");
const router = express.Router();

router.get("/", function(req, res) {
    res.render("index");
})

router.get("/book/:id", function(req, res, next) {
    Book.findById(req.params.id)
        .then(book => {
            res.render("book", {book});
        })
        .catch(e => {
            res.status(404);
            next();
        });
})

router.get("/books", function(req, res) {
    Book.find()
        .then(books => {
            res.render("books", {books});
        })
        .catch(e => console.error(e));
})

router.get("/addBook", function(req, res) {
    res.render("addBook", {errors: req.flash('errors')});
})
module.exports = router;