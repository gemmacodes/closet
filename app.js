var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var itemRouter = require("./routes/items");
var categoryRouter = require("./routes/categories");
var seasonRouter = require("./routes/seasons");
var colorRouter = require("./routes/colors");
var usersRouter = require("./routes/users");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/items", itemRouter);
app.use("/categories", categoryRouter);
app.use("/seasons", seasonRouter);
app.use("/colors", colorRouter);
app.use("/users", usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // we’re not rendering anything from the backend, we’re just sending responses back to the client
  res.status(err.status || 500);
  res.send("error");
});

module.exports = app;
