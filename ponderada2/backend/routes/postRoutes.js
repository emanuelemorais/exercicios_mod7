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

router.put('/edit/:id', authenticateToken, (req, res) => {
    postController.editPostById(req, res);
});

router.delete('/delete/:id', authenticateToken, (req, res) => {
    postController.deletePostById(req, res);
});

module.exports = router;
