const createError = require('http-errors');
const express = require('express');
const methodOverride = require('method-override');
const path = require('path');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersettingsRouter = require('./routes/usersettings');
const noteRouter = require('./routes/note');
const notesRouter = require('./routes/notes');

const app = express();

app.use(methodOverride('X-HTTP-Method-Override'));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/', indexRouter);
app.use('/usersettings', usersettingsRouter);
app.use('/note', noteRouter);
app.use('/notes', notesRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
    next(createError(404));
});

// error handler
app.use((err, req, res) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
