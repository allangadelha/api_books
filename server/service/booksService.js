const booksData = require('../data/booksData');

exports.getBooks = function () {
    return booksData.getBooks();
};
