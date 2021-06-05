const mongoose = require('mongoose');

const newUserSchema = new mongoose.Schema({
    name: String,
});

module.exports = newUserSchema;