import cookieParser from 'cookie-parser';
import e, { ErrorRequestHandler } from 'express';
import createHttpError from 'http-errors';
import morgan from 'morgan';
import path from 'path';
import router from './router';

const app = e();

// view engine setup
app.set('views', path.join(__dirname, '..', 'views'));
app.set('view engine', 'pug');

app.use(morgan('dev'));
app.use(e.json());
app.use(e.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(e.static(path.join(__dirname, '..', 'public')));

app.use('/', router);

// catch 404 and forward to error handler
app.use(async (req, res, next) => {
  next(createHttpError(404));
});

// error handler
app.use((async (err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
}) as ErrorRequestHandler);

export default app;
