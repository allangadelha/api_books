const axios = require('axios');
const crypto = require('crypto');
global.crypto = crypto;
const booksService = require('../service/booksService');

const request = function (url, method, data) {
    return axios({url, method, data, validateStatus: false});
};

test('Will get books', async function () {
    const book1 = await booksService.saveBook({ title: 'Livro 01', author: 'Autor 01', pages: 150, edition: 2, publication_date: new Date(), rented: true})
    const book2 = await booksService.saveBook({ title: 'Livro 02', author: 'Autor 02', pages: 190, edition: 2, publication_date: new Date(), rented: false})
    const book3 = await booksService.saveBook({ title: 'Livro 03', author: 'Autor 03', pages: 100, edition: 2, publication_date: new Date(), rented: true})
    const response = await request('http://localhost:3000/books', 'get');
    expect(response.status).toBe(200);
	const books = response.data;
	expect(books).toHaveLength(3);
	await booksService.deleteBook(book1.id);
	await booksService.deleteBook(book2.id);
	await booksService.deleteBook(book3.id);
});

test('Will save books', async function () {
    const data = { title: 'Livro 01', author: 'Autor 01', pages: 150, edition: 2, publication_date: new Date(), rented: true};
    const response = await request('http://localhost:3000/books', 'post', data);
    const response2 = await request('http://localhost:3000/books', 'post', data);
    expect(response2.status).toBe(409);
    const book = response.data;
    await booksService.deleteBook(book.id);
});

test('Will not save books', async function () {
    const data = { title: 'Livro 01', author: 'Autor 01', pages: 150, edition: 2, publication_date: new Date(), rented: true};
    const response = await request('http://localhost:3000/books', 'post', data);
    expect(response.status).toBe(201);
    const book = response.data;
    expect(book.title).toBe(data.title);
    expect(book.author).toBe(data.author);
    await booksService.deleteBook(book.id);
});

test('Will update a books', async function () {
    const book = await booksService.saveBook({ title: 'Livro 01', author: 'Autor 01', pages: 150, edition: 2, publication_date: new Date(), rented: true})
    book.title = "Livro 1.5";
    book.author = "Autor 1.5";
    const response = await request(`http://localhost:3000/books/${book.id}`, 'put', book);
    expect(response.status).toBe(204);
    const updatedBook = await booksService.getBook(book.id);
	expect(updatedBook.title).toBe(book.title);
	expect(updatedBook.author).toBe(book.author);
    await booksService.deleteBook(book.id);
});

test('Will not update a books', async function () {
    const book = {
        id: 100000
    };
    const response = await request(`http://localhost:3000/books/${book.id}`, 'put', book);
    expect(response.status).toBe(404);
});

test('Will delete a books', async function () {
    const book = await booksService.saveBook({ title: 'Livro 01', author: 'Autor 01', pages: 150, edition: 2, publication_date: new Date(), rented: true})
    const response = await request(`http://localhost:3000/books/${book.id}`, 'delete');
    expect(response.status).toBe(204);
    const updatedBook = await booksService.getBooks();
    await booksService.deleteBook(book.id);
});

test.only('Will not delete a books', async function () {
    const book = {
        id: 100000
    };
    const response = await request(`http://localhost:3000/books/${book.id}`, 'delete');
    expect(response.status).toBe(404);
});