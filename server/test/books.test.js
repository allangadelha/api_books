const axios = require('axios');

test('Will get books', async function () {
    const response = await axios({
        url: 'http://localhost:3000/books',
        method: 'get'
    });
    const books = response.data;
    expect(books).toHaveLength(5);

    const [firstBook] = books;
    expect(firstBook.id).toBe(1);
    expect(firstBook.title).toBe('Livro 01');
});