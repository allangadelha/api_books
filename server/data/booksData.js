const database = require('../infra/database');

exports.getBooks = function () {
    return database.query('select * from library.books');
};

exports.getBook = function (id) {
    return database.oneOrNone('select * from library.books where id = $1', [id]);
};

exports.saveBook  = function (book) {
    return database.one('insert into library.books (title, author, pages, edition, publication_date, rented) values ($1, $2, $3, $4, $5, $6) returning *', [book.title, book.author, book.pages, book.edition, book.publication_date, book.rented]);
};

exports.deleteBook = function (id) {
    return database.none('delete from library.books where id = $1', [id]);
};

exports.updateBook = function (id, book) {
    return database.none('update library.books set title = $1, author = $2, pages = $3, edition = $4, publication_date = $5, rented = $6 where id = $7', [book.title, book.author, book.pages, book.edition, book.publication_date, book.rented, id]);
};