const cors = require('cors');
const express = require('express');
const logger = require('morgan');
const router = require('./routes/index');

const createApp = () => {
    
    const app = express();
    app.use(cors());
    app.use(express.json());
    app.use(logger('combined'));
    app.use(router);

  return app;
};

module.exports = { createApp };
