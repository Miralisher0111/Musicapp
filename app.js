const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const flash=require('connect-flash')
const validator=require('express-validator')
const session=require('express-session')
const messages=require('express-messages')
const passport=require('passport')

const indexRouter = require('./routes/index');
const musicaddRouter = require('./routes/musicadd');
const musicRouter=require('./routes/music')
const musicEditRouter=require('./routes/musicEdit')
const musicDeleteRouter=require('./routes/musicDelet')
const registerRouter=require('./routes/register')
const loginRouter=require('./routes/login')
const logoutRouter=require('./routes/logout')



const app = express();
const db=require('./helper/db')();

// navigator express-messages

app.use(require('connect-flash')());
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});

// express sesions

app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  
}))

// express validator

app.use(validator({
  errorFormatter: (param, msg, value) => {
    let namespace = param.split('.')
      , root = namespace.shift()
      , formParam = root

    while (namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param: formParam,
      msg: msg,
      value: value
    }
  }
}));


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');


// passportjs ni ulaymiz

require('./cf/passport')(passport);

app.use(passport.initialize());
app.use(passport.session());

app.get("*",(req,res,next)=>{
  res.locals.user=req.user ||null;
  next();
});


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('.register',express.static(path.join(__dirname, 'public')));
app.use('/upload',express.static(path.join(__dirname,'upload')))

app.use('/', indexRouter);
app.use('/',registerRouter)
app.use('/',loginRouter)
app.use('/',logoutRouter)

app.use('/music', musicaddRouter);
app.use('/music',musicRouter)
app.use('/music',musicEditRouter)
app.use('/music',musicDeleteRouter)




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
