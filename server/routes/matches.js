const express = require('express');
const router = express.Router();

const matchesController = require('../controller/matches.controller');

router.get('/player/:puuid', matchesController.getPlayerInfo);
router.get('/:riotId/:offset', matchesController.get);

module.exports = router;
