const express = require('express');
const router = express.Router();

const championController = require('../controller/champion.controller');

router.get('/', championController.getTraits);
router.post('/recommend', championController.getRecommend);

module.exports = router;
