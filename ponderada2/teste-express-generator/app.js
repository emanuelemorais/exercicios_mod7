var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var userRoutes = require('./routes/userRoutes') 
var postRoutes = require('./routes/postRoutes')

var app = express();

app.use(logger('dev')); // irá registrar as informações da solicitação no console, como o método HTTP, o caminho, o código de status e o tempo de resposta.

app.use(express.json()); // se a solicitação tiver um corpo com dados em formato JSON, o middleware irá analisar esses dados e colocá-los na propriedade req.body da solicitação.

app.use(express.urlencoded({ extended: false })); // converte os dados do formulário em um objeto JavaScript e o coloca na propriedade req.body da solicitação (extended controla como os dados são analisados, com false indicando que os dados devem ser interpretados como pares chave-valor simples)

app.use(cookieParser()); //coloca um objeto chamado cookies na propriedade req da solicitação, permitindo que você acesse facilmente os cookies

// Minha rotas

app.use('/', indexRouter);
app.use('/users', userRoutes);
app.use('/post', postRoutes)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler -> projetado para ser executado quando ocorre um erro durante o processamento de uma solicitação HTTP
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  //res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
  
});

module.exports = app;
