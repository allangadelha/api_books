const express = require('express');
const router = express.Router();
const booksService = require('../service/booksService');

router.get('/books', async function (req, res) {
    try{
        const books = await booksService.getBooks();
        res.status(200).json(books);
    } catch (e) {
        res.status(404).json(e.message);
    }
});

router.get('/books/:id', async function (req, res) {
    const idBook = req.params.id;
    try {
        const book = await booksService.getBook(idBook);
        res.status(200).json(book);
    } catch (e) {
        res.status(404).json(e.message);
    }
});

router.post('/books', async function (req, res) {
    const book = req.body;
    try {
        const newBook = await booksService.saveBook(book);
        res.status(201).json(newBook);
    } catch (e){
        res.status(409).json(e.message);
    }
});

router.put('/books/:id', async function (req, res) {
    const book = req.body;
    try {
        await booksService.updateBook(req.params.id, book);
        res.status(200).json(book);
    } catch (e) {
        res.status(404).json(e.message);
    }
});

router.patch('/books/:id', async function (req, res) {
    const book = req.body;
    console.log("book: ", book);
    console.log("id book: ", req.params.id);
    try {
        await booksService.updateRentedBook(req.params.id, book);
        res.status(200).json(book);
    } catch (e) {
        res.status(404).json(e.message);
    }
});

router.delete('/books/:id', async function (req, res) {
    try {
        await booksService.deleteBook(req.params.id);
        res.status(204).end();
    } catch (e) {
        res.status(404).json(e.message);
    }
});


module.exports = router;