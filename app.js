const morgan = require('morgan');
const express = require('express');
const rootRouter = require('./routes/rootRoutes');

const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());
app.use('/', rootRouter);

module.exports = app;
