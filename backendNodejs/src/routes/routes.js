const express = require('express');
const routes = express.Router();
const authToken = require('../controllers/AuthTokenController');

const ExpensesController = require('../controllers/ExpensesController');

// Rota Expenses
routes.post('/expenses', authToken, ExpensesController.create);
routes.get('/expenses', authToken, ExpensesController.read);
routes.delete('/expenses/:id', authToken, ExpensesController.delete);
// Rota de Update para Expenses
routes.post('/expenses/update/:id', authToken, ExpensesController.update);

module.exports = routes;