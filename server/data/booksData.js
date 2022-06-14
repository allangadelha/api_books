const database = require('../infra/database');

exports.getBooks = function () {
    console.log('RETORNO DO BANCO: ', database.query('select * from library.books'));
    return database.query('select * from library.books');
};
