const path = require('path');
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser')
const db = require("./models").db;
const app = express();


app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.use(express.static(path.join(__dirname, '..', 'public')))

// catch 404 (i.e., no route was hit) and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// handle all errors (anything passed into `next()`)
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  console.error(err);
  res.send(err.message);
});

const port = 3000; 

app.listen(port, function() {
	console.log('Doctor, I think we\'re being listened to...by a server on port', port);
	db
	  .sync()
	  .then( () => {
	  	console.log('our database is right and tight and synced');
	  })
	  .catch((err) => {
	  	console.error('what the fuck happened here, Boss?', err, err.stack);
	  })
});