/* installed 3rd party packages */
/* generates HTTP errors */
let createError = require('http-errors'); 
/* web framework */
let express = require('express'); 
/* directory paths */
let path = require('path'); 
let cookieParser = require('cookie-parser'); 
/* HTTP request logger */
let logger = require('morgan'); 

/* route modules */
let indexRouter = require('./routes/index'); 
let usersRouter = require('./routes/users'); 

/* app initialization */
let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views')); 
app.set('view engine', 'ejs');

/* HTTP request logs */
app.use(logger('dev')); 
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'node_modules')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

/* error handler */
app.use(function(err, req, res, next) {
  /* set locals, only providing error in development */
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  /* render the error page*/
  res.status(err.status || 500);
  res.render('error',
  {
    title: "Error"
  }
  );
});

module.exports = app;
