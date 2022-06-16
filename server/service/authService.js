const authData = require('../data/booksData');

exports.auth = function () {
    return auth.getUSer();
};

exports.login = async function (user) {
    const existsUser = await authData.login(user);
    if(!existsUser) {
        throw new Error('User not found.');
    }
    return existsUser;
};