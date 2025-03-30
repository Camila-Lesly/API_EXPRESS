var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var app = express();

var MongoDBUtil = require('./modules/mongodb/mongodb.module').MongoDBUtil;

var AuthController = require('./modules/auth/auth.module')().AuthController;
var ProductController = require('./modules/product/product.module')().ProductController;

const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');


const cors = require('cors');

// Configuración de CORS
app.use(cors({
  origin: 'http://localhost:3000',  // Cambia este valor si tu frontend corre en otro puerto
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));


const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'APIExpress',
      version: '1.0.0',
    },
  },
  apis: ['./modules/auth/*controller.js','./modules/product/*controller.js'],
};
const swaggerSpec = swaggerJsdoc(options);


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

MongoDBUtil.init();

app.use('/api/auth', AuthController);
app.use('/api/product', ProductController);

app.use(express.static(path.join(__dirname, './views/frontend/build')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './views/frontend/build', 'index.html'));
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);

    res.json({
        message: res.locals.message,
        error: res.locals.error
    });
});

module.exports = app;
