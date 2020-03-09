const express = require("express");
const mongoose = require("mongoose");
const Book = require("../models/Book");
const router = express.Router();

router.post("/books", async function(req, res) {
    let errors = [];

    if(typeof req.body.title !== "string") errors.push("title must be a string");
    if(await Book.exists({title: new RegExp(`^${req.body.title}$`, "i")})) errors.push("Title already exists");
    if(typeof req.body.author !== "string") errors.push("author must be a string");
    if(!(/^[0-9]+$/).test(req.body.pages)) errors.push("pages must be a number");
    if(!(/^[0-9]{4}$/).test(req.body.year)) errors.push("year must contain 4-digits");
    if(Number(req.body.year) > (new Date()).getFullYear()) errors.push("year cannot extend past the present");

    if (errors.length > 0) {
        console.log(errors);
        req.flash('errors', errors);
        res.redirect("/addBook");
    } else {
        (new Book({
            title: req.body.title,
            author: req.body.author,
            pages: Number(req.body.pages),
            year: Number(req.body.year)
        })).save()
        .then(book => {
            res.status(201)
            if(req.accepts('html')) {
                res.redirect('/book/'+book._id);
            }
            else {
                res.send(book)
            }
        })
        .catch(error => {
            console.log(error);
            res.send(error);
        })
    }
})
    
module.exports = router;