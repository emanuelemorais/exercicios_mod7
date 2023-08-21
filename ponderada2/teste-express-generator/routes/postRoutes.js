var express = require('express');
var router = express.Router();
var postController = require('../controllers/postController');

router.post('/new', (req, res) => {
    postController.newPost(req, res);
});

router.get('/all/:id', (req, res) => {
    postController.getPostById(req, res);
})

module.exports = router;
