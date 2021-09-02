const express = require('express');
const router = express.Router();

const matchesController = require('../controller/matches.controller');

router.get('/:riotId', matchesController.get);

module.exports = router;
