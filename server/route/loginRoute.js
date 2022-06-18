const express = require('express');
const router = express.Router();
const authService = require('../service/authService');

const jwt = require('jsonwebtoken');

const SECRET = 'api_books';

router.post('/login', async (req, res, next) => {
    const user = req.body;

    try {
        existsUser = await authService.login(user);
        const token = jwt.sign({ id: existsUser.id }, SECRET, { expiresIn: 120 });
        res.status(200).json({ auth: true, token });
    } catch (e) {
        next(e);
    }
});

module.exports = router;