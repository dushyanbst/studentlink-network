const express = require('express');
const router = express.Router();
const { getAllJobs, createJob } = require('../controllers/jobsController.cjs');
const { authenticate, isAdmin } = require('../middleware/auth.cjs');

router.get('/', authenticate, getAllJobs);
router.post('/', authenticate, isAdmin, createJob);

module.exports = router;
