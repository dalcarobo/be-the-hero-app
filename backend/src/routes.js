const express = require('express');
const OngController = require('./controllers/OngController');
const ProfileController = require('./controllers/ProfileController');
const IncidentsController = require('./controllers/IncidentsController');
const SessionController = require('./controllers/SessionController');
const routes = express.Router();

routes.post('/session', SessionController.index); 

routes.get('/ongs', OngController.index);
routes.post('/ongs', OngController.create);

routes.get('/profile', ProfileController.index);

routes.post('/incident', IncidentsController.create);
routes.get('/incident', IncidentsController.index);
routes.delete('/incident/:id', IncidentsController.delete);

module.exports = routes;