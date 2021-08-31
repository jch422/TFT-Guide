const express = require('express');
const router = express.Router();

const initialDecks = require('../controller/initial.controller');

router.get('/', initialDecks.get);

module.exports = router;
