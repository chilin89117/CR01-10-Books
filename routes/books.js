const express = require('express');
const router = express.Router();

const Book = require('../server/models/Book');

router.get('/', async (req,res) => {
  let limit = req.query.limit ? parseInt(req.query.limit) : 10;
  let order = req.query.ord ? req.query.ord : 'asc';
  try {
    await Book.find()
              .sort({price:order})
              .limit(limit)
              .exec()
              .then(books => res.status(200).send(books));
  } catch(err) {
    res.status(400).send(err.message);
  }
});

router.get('/:id', async (req,res) => {
  try {
    const book = await Book.findById(req.params.id);
    if(!book) res.status(404).send('Book not found.');
    else  res.status(200).send(book);
  } catch(err) {
    res.status(400).send(err.message);
  }
});

router.post('/add', async (req,res) => {
  const book = new Book({
      name: req.body.name,
      author: req.body.author,
      pages:  req.body.pages,
      price:  req.body.price,
      stores:  req.body.stores
  });
  try {
    const newBook = await book.save();
    if(!newBook) res.status(500).send('Save new book failed.');
    else res.status(200).send(newBook);
  } catch(err) {
    res.status(400).send(err.message);
  }
});

router.patch('/:id', async (req,res) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.id,
                                              {$set: req.body},
                                              {new: true});
    if(!book) res.status(404).send('No such book to update.');
    else res.status(200).send(book);
  } catch(err) {
    res.status(400).send(err.message);
  }
});

router.delete('/:id/delete', async (req,res) => {
  try {
    const book = await Book.findByIdAndRemove(req.params.id);
    if(!book) res.status(404).send('No such book to delete.');
    else res.status(200).send(book);
  } catch(err) {
    res.status(400).send(err.message);
  }
});

module.exports = router;
