const express = require('express');
const routes = require('./routes/routes');
const authRoutes = require('./routes/authRoutes');
const cors = require('cors');
require('dotenv').config();

const app = express();
require('./config/dbConfig');

app.use(cors());
app.use(express.json());
app.use(routes);
app.use(authRoutes);

app.listen(process.env.PORT);
console.log('Server running on localhost, PORT: ' + process.env.PORT);