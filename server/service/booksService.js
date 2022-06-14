const booksData = require('../data/booksData');

exports.getBooks = function () {
    return booksData.getBooks();
};

exports.saveBook = function (book) {
    return booksData.saveBook(book);
};

exports.deleteBook = function (id) {
    return booksData.deleteBook(id);
};
