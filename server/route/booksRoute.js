const express = require('express');
const router = express.Router();
const booksService = require('../service/booksService');
const authService = require('../service/authService');

const SECRET = 'api_books';

const jwt = require('jsonwebtoken');

router.post('/login', async function (req, res, next) {
    const user = req.body;

    try {
        existsUser = await authService.login(user);
        const token = jwt.sign({ id: existsUser.id }, SECRET, { expiresIn: 60 });
        res.status(200).json({ auth: true, token });
    } catch (e) {
        next(e);
    }
});

function verifyJWT (req,res, next) {
    const token = req.headers['x-access-token'];
    jwt.verify(token, SECRET, (err, decoded) => {
        if(err) return res.status(401).json({ auth: false});

        req.id = decoded.id;
        next();
    });
}

router.get('/books', verifyJWT, async function (req, res,next) {
    try{
        const books = await booksService.getBooks();
        res.status(200).json(books);
    } catch (e) {
        next(e);
    }
});

router.get('/books/:id', verifyJWT, async function (req, res,next) {
    const idBook = req.params.id;
    try {
        const book = await booksService.getBook(idBook);
        res.status(200).json(book);
    } catch (e) {
        next(e);
    }
});

router.post('/books', verifyJWT, async function (req, res,next) {
    const book = req.body;
    try {
        const newBook = await booksService.saveBook(book);
        res.status(201).json(newBook);
    } catch (e){
        next(e);
    }
});

router.put('/books/:id', verifyJWT, async function (req, res,next) {
    const book = req.body;
    try {
        await booksService.updateBook(req.params.id, book);
        res.status(200).json(book);
    } catch (e) {
        next(e);
    }
});

router.patch('/books/:id', verifyJWT, async function (req, res,next) {
    const book = req.body;
    try {
        await booksService.updateRentedBook(req.params.id, book);
        res.status(200).json(book);
    } catch (e) {
        next(e);
    }
});

router.delete('/books/:id', verifyJWT, async function (req, res,next) {
    try {
        await booksService.deleteBook(req.params.id);
        res.status(204).end();
    } catch (e) {
        next(e);
    }
});


module.exports = router;