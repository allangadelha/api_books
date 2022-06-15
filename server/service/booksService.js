const booksData = require('../data/booksData');

exports.getBooks = function () {
    return booksData.getBooks();
};

exports.getBook = function (id) {
    return booksData.getBook(id);
};

exports.saveBook = function (book) {
    return booksData.saveBook(book);
};

exports.deleteBook = function (id) {
    return booksData.deleteBook(id);
};

exports.updateBook = function (id, book) {
    return booksData.updateBook(id, book);
};