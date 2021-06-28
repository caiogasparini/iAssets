const mongoose = require('mongoose');

const AuthSchema = new mongoose.Schema({
    name: { type: String, required: true, minlength: 3, maxlength: 70 },
    email: { type: String, required: true, minlength: 3, maxlength: 100 },
    password: { type: String, required: true, minlength: 5, maxlength: 150 },
    createAt: { type: Date, default: Date.now }
});

module.exports = AuthSchema;