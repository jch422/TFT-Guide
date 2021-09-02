const express = require('express');
const router = express.Router();

const usersController = require('../controller/users.controller');

router.get('/login', usersController.get);
router.post('/', usersController.post);

module.exports = router;
