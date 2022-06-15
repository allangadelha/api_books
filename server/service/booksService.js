const booksData = require('../data/booksData');

exports.getBooks = function () {
    return booksData.getBooks();
};

exports.getBook = async function (id) {
    const book = await booksData.getBook(id);
    if(!book) {
        throw new Error('Book not found.');
    }
    return book;
};

exports.saveBook = async function (book) {
    const existingBook = await booksData.getBookByTitle(book.title);
    if(existingBook) {
        throw new Error('Book already exists.');
    }
    return booksData.saveBook(book);
};

exports.deleteBook = async function (id) {
    await exports.getBook(id);
    return booksData.deleteBook(id);
};

exports.updateBook = async function (id, book) {
    await exports.getBook(id);
    return booksData.updateBook(id, book);
};

exports.updateRentedBook = async function (id, book) {
    await exports.getBook(id);
    return booksData.updateRentedBook(id, book);
};