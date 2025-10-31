const express = require('express');
const router = express.Router();
const { getAllAnnouncements, createAnnouncement } = require('../controllers/announcementsController.cjs');
const { authenticate, isAdmin } = require('../middleware/auth.cjs');

router.get('/', authenticate, getAllAnnouncements);
router.post('/', authenticate, isAdmin, createAnnouncement);

module.exports = router;
