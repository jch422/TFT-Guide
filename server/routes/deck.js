const express = require('express');
const router = express.Router();

const decksController = require('../controller/decks.controller');

router.get('/:id', decksController.get);
router.post('/', decksController.post);
router.put('/', decksController.put);
router.delete('/:id', decksController.delete);

module.exports = router;
