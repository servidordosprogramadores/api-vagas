const express = require('express');
const JobController = require('./controllers/JobController');

const routes = express.Router();

routes.get('/estagio', JobController.getEstagio);
routes.get('/pleno', JobController.getPleno);
routes.get('/senior', JobController.getSenior);

module.exports = routes;
