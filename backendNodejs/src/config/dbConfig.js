const mongoose = require('mongoose');
const ExpensesDataSchema = require('../models/ExpensesData');
require('dotenv').config();

const dbConfig = process.env.DB;

const exConn = mongoose.createConnection(dbConfig, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

exConn.model('Expenses', ExpensesDataSchema);
//console.log(mongoose.connection);

module.exports = exConn;
