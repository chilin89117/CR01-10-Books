const express = require('express');
const router = express.Router();

const Store = require('../server/models/Store');

router.get('/', async (req,res) => {
  try {
    await Store.find()
               .then(stores => res.status(200).send(stores));
  } catch(err) {
    res.send(400).send(err.message);
  }
});

router.post('/add', async (req,res) => {
  const store = new Store({
      name: req.body.name,
      address: req.body.address,
      phone: req.body.phone
  });
  try {
    const newStore = await store.save();
    if(!newStore) res.status(500).send('Save new store failed.');
    else res.status(200).send(newStore);
  } catch(err) {
    res.status(400).send(err.message);
  }
});

module.exports = router;
