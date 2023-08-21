var express = require('express');
var router = express.Router();
var userController = require('../controllers/userController');

router.post('/create', (req, res) => {
    userController.createUser(req, res);
});

module.exports = router;
