const express = require('express');
const router = express.Router();
const booksService = require('../service/booksService');

router.get('/books', async function (req, res) {
    const books = await booksService.getBooks();
    res.json(books);
});

router.get('/books/:id', async function (req, res) {

});

router.post('/books', async function (req, res) {
    const book = req.body;
    const newBook = await booksService.saveBook(book);
    res.json(newBook);
});

router.put('/books/:id', async function (req, res) {
    const book = req.body;
    await booksService.updateBook(req.params.id, book);
    res.end();
});

router.delete('/books/:id', async function (req, res) {
    await booksService.deleteBook(req.params.id);
	res.end();
});


module.exports = router;