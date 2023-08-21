var express = require('express');
var router = express.Router();
var postController = require('../controllers/postController');
var authenticateToken = require('../middlewares/auth')

router.post('/new', authenticateToken, (req, res) => {
    postController.newPost(req, res);
});

router.get('/all', authenticateToken, (req, res) => {
    postController.getPostById(req, res);
})

module.exports = router;
