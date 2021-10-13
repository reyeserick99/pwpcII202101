import createError from 'http-errors';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';

import indexRouter from '@s-routes/index';
import usersRouter from '@s-routes/users';

//IMPORTACION MODULOS DE WEBPACK
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from '../webpack.dev.config';
import webpackDevConfig from '../webpack.dev.config';

//CONSULTAR EL MODO EN QUE SE EJECUTA LA APLICACION
const env = process.env.NODE_ENV   || 'development'; 

//SE CREA LA APLICACION EXPRESS
var app = express();

//VERIFICANDO EL MODO DE EJECUCION DE LA APLICACION
if(env === 'development'){
  console.log('> Exceuting in Development Mode: Webpack Hot Reloading');
  //PASO 1- AGREGANDO LA RUA DEL HMR
  //reoad=true = habilita la recarga del frontend cuando hay cambios del codigo fuente del frontend
  //timeout=1000: tiempo de espera entre recarga y recarga de la pagina
  webpackConfig.entry = ['webpack-hot-middleware/client?reload=true&timeout=1000', webpackConfig.entry ];
  
  //PASO 2 - AGREGAMOS PLUGIN
  webpackConfig.plugins.push(new webpack.HotModuleReplacementPlugin());

  //PASO 3 - CREAR EL COMPILADOR DE WEBPACK
  const compiler = webpack(webpackConfig);

  //PASO 4 - AGREGANDO MIDDLEWARE A LA CADENA DE MIDDLEWARES DE LA APLICACION
  app.use(webpackDevMiddleware(compiler,{
    publicPath: webpackDevConfig.output.publicPath
  }));

  //PASO 5- AGREGANDO EL WEBPACK HOT MIDDLEWARE
  app.use(webpackHotMiddleware(compiler));
}else{
  console.log('>Exceuting in Productions Mode...');
}

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));  /*Realiza la peticion */
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname,'..', 'public'))); /*Parte y/o archivos estaticos ayuda a que pueda mandar la peticion mucho antes de arvhivos y/o imagenes*/ 

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
