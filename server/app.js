/* eslint-disable prettier/prettier */
/* eslint-disable no-console */
import createError from 'http-errors';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import winston from '@server/config/winston';

import indexRouter from '@s-routes/index';
import usersRouter from '@s-routes/users';

// IPORTING CONFIGURATIONS
import configTemplateEngine from '@s-config/template-engine'

// IMPORTACION MODULOS DE WEBPACK
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackDevConfig from '../webpack.dev.config';

// CONSULTAR EL MODO EN QUE SE EJECUTA LA APLICACION
const env = process.env.NODE_ENV || 'development';

// SE CREA LA APLICACION EXPRESS
const app = express();

// VERIFICANDO EL MODO DE EJECUCION DE LA APLICACION
if (env === 'development') {
  console.log('> Exceuting in Development Mode: Webpack Hot Reloading');
  // PASO 1- AGREGANDO LA RUA DEL HMR
  // reoad=true = habilita la recarga del frontend cuando hay cambios del codigo fuente del frontend
  // timeout=1000: tiempo de espera entre recarga y recarga de la pagina
  webpackDevConfig.entry = [
    'webpack-hot-middleware/client?reload=true&timeout=1000',
    webpackDevConfig.entry,
  ];

  // PASO 2 - AGREGAMOS PLUGIN
  webpackDevConfig.plugins.push(new webpack.HotModuleReplacementPlugin());

  // PASO 3 - CREAR EL COMPILADOR DE WEBPACK
  const compiler = webpack(webpackDevConfig);

  // PASO 4 - AGREGANDO MIDDLEWARE A LA CADENA DE MIDDLEWARES DE LA APLICACION
  app.use(
    webpackDevMiddleware(compiler, {
      publicPath: webpackDevConfig.output.publicPath,
    }),
  );

  // PASO 5- AGREGANDO EL WEBPACK HOT MIDDLEWARE
  app.use(webpackHotMiddleware(compiler));
} else {
  console.log('>Exceuting in Productions Mode...');
}

// view engine setup
configTemplateEngine(app);

app.use(morgan('dev', { stream: winston.stream })); /* Realiza la peticion */
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  express.static(path.join(__dirname, '..', 'public')),
); /* Parte y/o archivos estaticos ayuda a que pueda mandar la peticion mucho antes de arvhivos y/o imagenes */

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  // log
  winston.error(`Code: 404, Message: Page Not Found, URL: ${req.originalUrl}, Method: ${req.method}`
  );
  next(createError(404));
});

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Loggeando con winston
  winston.error( 
    `status: ${err.status || 500}, Message: ${err.message}, Method: ${
      req.method
    },  IP: ${req.ip}`
    );

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
