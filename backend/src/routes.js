const express = require('express');
const OngController = require('./controllers/OngController'); // Importanto o "corpo das rotas"
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');


const routes = express.Router();

routes.post('/sessions', SessionController.create);

// Rotas Ongs
routes.get('/ongs', OngController.index);
routes.post('/ongs', OngController.create);

// Casos específicos
routes.get('/profile', ProfileController.index);

// Rotas Casos
routes.get('/incidents', IncidentController.index);
routes.post('/incidents', IncidentController.create);
routes.delete('/incidents/:id', IncidentController.delete);

module.exports = routes;