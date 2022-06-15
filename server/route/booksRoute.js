const express = require('express');
const router = express.Router();
const booksService = require('../service/booksService');

router.get('/books', async function (req, res,next) {
    try{
        const books = await booksService.getBooks();
        res.status(200).json(books);
    } catch (e) {
        next(e);
    }
});

router.get('/books/:id', async function (req, res,next) {
    const idBook = req.params.id;
    try {
        const book = await booksService.getBook(idBook);
        res.status(200).json(book);
    } catch (e) {
        next(e);
    }
});

router.post('/books', async function (req, res,next) {
    const book = req.body;
    try {
        const newBook = await booksService.saveBook(book);
        res.status(201).json(newBook);
    } catch (e){
        next(e);
    }
});

router.put('/books/:id', async function (req, res,next) {
    const book = req.body;
    try {
        await booksService.updateBook(req.params.id, book);
        res.status(200).json(book);
    } catch (e) {
        next(e);
    }
});

router.patch('/books/:id', async function (req, res,next) {
    const book = req.body;
    try {
        await booksService.updateRentedBook(req.params.id, book);
        res.status(200).json(book);
    } catch (e) {
        next(e);
    }
});

router.delete('/books/:id', async function (req, res,next) {
    try {
        await booksService.deleteBook(req.params.id);
        res.status(204).end();
    } catch (e) {
        next(e);
    }
});


module.exports = router;