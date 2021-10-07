const express = require('express');
const userRoutes = require('routes/users');
const app = express();

app.use('/', userRoutes);

module.exports = app;