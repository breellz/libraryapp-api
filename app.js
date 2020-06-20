const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

if (process.env.ENV === 'Test') {
  console.log('this is a test');
  const db = mongoose.connect('mongodb://localhost/bookAPI-Test');
} else {
  console.log('this is for real');
  const db = mongoose.connect('mongodb://localhost/bookAPI');
}
const port = process.env.PORT || 3000;
const Book = require('./models/bookModel');
const bookrouter = require('./routes/bookRouter')(Book);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api', bookrouter);

app.get('/', (req, res) => {
  res.send('Holla');
});

app.server = app.listen(port, () => {
  console.log(`server is runing on port ${port}`);
});

module.exports = app;
