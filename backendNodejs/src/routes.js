const express = require('express');
const routes = express.Router();

const ExpensesController = require('./controllers/ExpensesController');

// Rota Expenses
// routes.post('/expenses', ExpensesController.create);
routes.get('/expenses', ExpensesController.read);

module.exports = routes;