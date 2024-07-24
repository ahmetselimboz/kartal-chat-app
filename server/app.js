var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
require("dotenv").config()
const cors = require("cors")
const bodyParser = require("body-parser")
const chalk = require("chalk") 
const morgan = require("./lib/morgan")

var indexRouter = require("./routes/index");
const _enum = require("./config/enum");

var app = express();

app.use(cors());
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(morgan);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());


app.use("/api", indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  console.log(chalk.red(err));

  res.locals.error = req.app.get("env") === "development" ? err : {};
  res.status(_enum.HTTP_CODES.INT_SERVER_ERROR).json({ code: _enum.HTTP_CODES.INT_SERVER_ERROR, error: err });
});

module.exports = app;
