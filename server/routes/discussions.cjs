const express = require('express');
const router = express.Router();
const { getAllDiscussions, createDiscussion, getDiscussionById, createReply } = require('../controllers/discussionsController.cjs');
const { authenticate } = require('../middleware/auth.cjs');

router.get('/', authenticate, getAllDiscussions);
router.post('/', authenticate, createDiscussion);
router.get('/:id', authenticate, getDiscussionById);
router.post('/:discussionId/replies', authenticate, createReply);

module.exports = router;
