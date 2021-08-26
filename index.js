const createError = require("http-errors");
const express = require("express");
const cookieParser = require("cookie-parser");
const morganLogger = require("morgan");
const cors = require("cors");
const helmet = require("helmet");

require("dotenv").config();

global.__logger = require("./config/logger");
const indexRouter = require("./routes/index");

const app = express();
app.use(morganLogger(process.env.NODE_ENV));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(helmet());
app.use(cors());
app.use("/api", indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // render the error page
  res.status(err.status || 500);
  res.send({
    message: err.message,
    code: err.status,
    data: err.data,
    error: true,
  });
});

module.exports = app;
