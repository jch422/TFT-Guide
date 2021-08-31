const express = require('express');
const router = express.Router();

const decksController = require('../controller/decks.controller');

router.get('/:id', decksController.get);
router.post('/', decksController.post);

module.exports = router;
