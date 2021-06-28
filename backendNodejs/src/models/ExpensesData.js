const mongoose = require('mongoose');

const ExpensesDataSchema = new mongoose.Schema({
    expenseName: String,
    value: Number,
    dueDate: Date,
    obs: String,
    datePayment: Date,
});

module.exports = ExpensesDataSchema;