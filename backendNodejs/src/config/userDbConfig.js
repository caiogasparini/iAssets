const mongoose = require('mongoose');
const AuthSchema = require('../models/AuthModel');
require('dotenv').config();

const userDbConfig = process.env.USER_DB;

const authConn = mongoose.createConnection(userDbConfig, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

authConn.model('AuthModels', AuthSchema);

module.exports = authConn;