const express = require('express');
const router = express.Router();
const { getAllPosts, createPost, likePost } = require('../controllers/postsController.cjs');
const { authenticate } = require('../middleware/auth.cjs');

router.get('/', authenticate, getAllPosts);
router.post('/', authenticate, createPost);
router.post('/:id/like', authenticate, likePost);

module.exports = router;
