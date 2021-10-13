const express = require('express');

function routes(){

const bookRouter = require('./routes/bookRouter')();
    bookRouter.route('/books')
    .post((req, res) => {
        const book = new Book(req.body);
        book.save(function(err){
        if (err) console.error(err);
        });
        return res.status(200).json(book);
    })
    .get((req, res) => {
        const query = {};
        if(req.query.genre) {
        query.genre = req.query.genre;
        }
        Book.find(query, (err, books) =>{
        if(err) {
            return res.send(err);
        }
        return res.json(books);
        });
    });
    
    bookRouter.route('/books/:bookId')
    .get((req, res) => {
        Book.findById(req.params.bookId, (err, book) =>{
        if(err) {
            return res.send(err);
        }
        return res.json(book);
        });
    });
    return bookRouter;
}

module.exports = routes;