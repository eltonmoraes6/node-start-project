require('../env');
const express = require('express');
const path = require('path');
const morgan = require('morgan');
const helmet = require('helmet');
const compression = require('compression');
const cors = require('cors');

const { corsOptionsDelegate } = require('./config/cors');

const app = express();

// Middlewares
//app.use(morgan('combined', { stream: winston.stream }));
app.use(morgan('dev'));
app.use(helmet());
app.use(compression());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Cors settings
app.use(cors(corsOptionsDelegate));

const swaggerUi = require('swagger-ui-express'),
  swaggerDocument = require('./swagger.json');

//Swagger Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Static Files
app.use(express.static(path.join(__dirname, '../build')));

//Routes
app.use(require('./routes'));
app.get('*', (req, res) => {
  res.sendFile('index.html');
});

//Error
app.use((req, res, next) => {
  return res
    .status(404)
    .send({ errors: [{ route: `${req.url}`, msg: 'Not Found.' }] });
});

app.use((err, req, res, next) => {
  return res.status(500).send({ error: err });
});

module.exports = app;
