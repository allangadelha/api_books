const database = require('../infra/database');

exports.getBooks = function () {
    return database.query('select * from library.books order by id');
};

exports.getBook = function (id) {
    return database.oneOrNone('select * from library.books where id = $1', [id]);
};

exports.getBookByTitle = function (title) {
    return database.oneOrNone('select * from library.books where title = $1', [title]);
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

exports.updateRentedBook = function (id, book) {
    return database.none('update library.books set rented = $1 where id = $2', [book.rented, id]);
};

exports.login = function (user) {
    return database.oneOrNone('select * from library.users where email = $1 and password = $2', [user.email, user.password]);
};


