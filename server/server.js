const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const booksRouter = require('../routes/books');
const storesRouter = require('../routes/stores');

app.use(express.static(__dirname + '/../app'));
app.use(bodyParser.json());

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/cr01-10');

app.use('/api/books', booksRouter);
app.use('/api/stores', storesRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening at port ${port}...`));
