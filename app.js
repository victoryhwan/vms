var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var http = require('http');
var https = require('https');
var createError = require('http-errors');
var favicon = require('serve-favicon');
var path = require('path');
var app = express();
var cors = require('cors');
var robots = require('express-robots-txt');
var logger = require('morgan');
require('dotenv').config();

app.set('port', process.env.PORT || 3030);


http.createServer(app).listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});

app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');
app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'hiphoper',
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 6000 * 60 * 60 // 쿠키 유효기간 24시간
  }
}));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(express.static(path.join(__dirname, '/views')));

var allowCORS = function(req, res, next) {
  res.header('Acess-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, Accecpt, Content-Type, Access-Control-Allow-Origin, Authorization, X-Requested-With, Access-Control-Request-Method, Access-Control-Request-Headers');
  res.header('Access-Control-Allow-Credentials', true);
  next();
};
app.use(allowCORS);
app.use(cors())

// app.get('/', (req, res) => res.send('Hello World!'));
app.get('/', function (req, res) {
    if (!req.session.key) {
        req.session.destroy();
        res.redirect('/login')
    } else {
        res.redirect('/home/dashboard')
    }
});


app.use(robots(__dirname + '/robots.txt'));
app.use(robots({UserAgent: '*', Disallow: '/'}))
app.use('/login', require('./routes/login/login.js'));
app.use('/node_modules', express.static(__dirname + '/node_modules'));

app.use('/', require('./routes/dashboard/dashboard.js'));
app.use('/admin', require('./routes/admin/admin.js'));


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    console.log('next(createError(404));');
    next(createError(404));
});

process.on('uncaughtException', (err) => {
    console.log('whoops! there was an error');
});

app.use(function (err, req, res, next) {
    // set locals, only providing error in developmente
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // console.log(err)
    // render the error page
    res.status(err.status || 500);
    // res.render('error');
    res.render('util/404', {
        pid: req.session.key,
        apiHost: process.env.API_SERVER_HOST
    })
});