const express = require('express');
const router = express.Router();
const booksService = require('../service/booksService');

router.get('/books', async function (req, res) {
    const books = await booksService.getBooks();
    res.json(books);
});

router.get('/books/:id', async function (req, res) {
    const idBook = req.params.id;
    const book = await booksService.getBook(idBook);
    res.json(book);
});

router.post('/books', async function (req, res) {
    const book = req.body;
    const newBook = await booksService.saveBook(book);
    res.status(201).json(newBook);
});

router.put('/books/:id', async function (req, res) {
    const book = req.body;
    await booksService.updateBook(req.params.id, book);
    res.status(204).json(book);
});

router.delete('/books/:id', async function (req, res) {
    await booksService.deleteBook(req.params.id);
	res.status(204).end();
});


module.exports = router;