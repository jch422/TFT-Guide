const express = require('express');
const router = express.Router();

const championController = require('../controller/champion.controller');

router.post('/', championController.postRecommend);

module.exports = router;
