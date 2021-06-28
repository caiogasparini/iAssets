const express = require('express');
const authRoutes = express.Router();

const createUserCollectionController = require('../controllers/createUserCollectionController');
const authController = require('../controllers/AuthController');

// Rota de Authentication
authRoutes.post('/login', authController.login);
authRoutes.post('/register', [authController.register,createUserCollectionController.create]);

module.exports = authRoutes;