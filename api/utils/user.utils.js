const CryptoJS = require('crypto-js');
const jwt = require("jsonwebtoken");

exports.generatePassword = (string) => {
    const password = CryptoJS.SHA256(string).toString()
    return password;
}