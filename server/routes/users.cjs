const express = require('express');
const router = express.Router();
const { getPendingUsers, approveUser, rejectUser, getUserProfile } = require('../controllers/usersController.cjs');
const { authenticate, isAdmin } = require('../middleware/auth.cjs');

router.get('/pending', authenticate, isAdmin, getPendingUsers);
router.put('/:id/approve', authenticate, isAdmin, approveUser);
router.put('/:id/reject', authenticate, isAdmin, rejectUser);
router.get('/profile', authenticate, getUserProfile);

module.exports = router;
