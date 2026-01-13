const express = require('express');
const JobController = require('./controllers/JobController');

const routes = express.Router();

routes.get('/latest', JobController.getLatest);

module.exports = routes;
