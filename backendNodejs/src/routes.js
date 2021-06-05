const express = require('express');
const routes = express.Router();

const ExpensesController = require('./controllers/ExpensesController');
const createUserCollectionController = require('./controllers/createUserCollectionController');

// Rota Expenses
routes.post('/expenses', ExpensesController.create);
routes.get('/expenses', ExpensesController.read);
routes.delete('/expenses/:id', ExpensesController.delete);
// Rota de Update para Expenses
routes.post('/expenses/update/:id', ExpensesController.update);

// rota de createCollection para novos usuários
routes.post('/user/:userId', createUserCollectionController.create);

module.exports = routes;