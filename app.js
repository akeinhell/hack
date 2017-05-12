import express from 'express';
import path from 'path';
import twig from 'twig';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import index from './routes/index';
import api from './routes/api';
let debug = require('debug')('quest.club:server:app');

const app = express();


app.use(express.static(path.join(__dirname, 'public')));

const passport   = require('passport');
const session    = require('express-session');
const RedisStore = require('connect-redis')(session);
const store      = new RedisStore({
    host: 'redis',
    prefix: 'session:'
});


app.use(session({
    secret: 'very_big_secret',
    resave: true,
    saveUninitialized: true,
    store,
    // cookie: {
    //     path: '/',
    //     httpOnly: true
    // }
}));
app.use(passport.initialize());
app.use(passport.session());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'twig');
twig.cache(false);
app.set('cache', false);

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
//app.use(lessMiddleware(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/api', api);

// catch 404 and forward to error handler
app.use((req, res, next) => {
    const err  = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use((err, req, res, next) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error   = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
