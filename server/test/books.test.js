const axios = require('axios');
const crypto = require('crypto');
global.crypto = crypto;
const booksService = require('../service/booksService');

const generate = function () {
	return crypto.randomBytes(10).toString('hex');
};

const request = function (url, method, data) {
    return axios({url, method, data});
};

test('Will get books', async function () {
    const book1 = await booksService.saveBook({ title: generate(), author: generate(), pages: 100, edition: 2, publication_date: new Date(), rented: true})
    const book2 = await booksService.saveBook({ title: generate(), author: generate(), pages: 100, edition: 2, publication_date: new Date(), rented: true})
    const book3 = await booksService.saveBook({ title: generate(), author: generate(), pages: 100, edition: 2, publication_date: new Date(), rented: true})
    const response = await request('http://localhost:3000/books', 'get');
	const books = response.data;
	expect(books).toHaveLength(3);
	await booksService.deleteBook(book1.id);
	await booksService.deleteBook(book2.id);
	await booksService.deleteBook(book3.id);
});

test('Will save books', async function () {
    const data = { title: generate(), author: generate(), pages: 100, edition: 2, publication_date: new Date(), rented: true};
    const response = await request('http://localhost:3000/books', 'post', data);
    const book = response.data;
    expect(book.title).toBe(data.title);
    expect(book.author).toBe(data.author);
    await booksService.deleteBook(data.id);
});