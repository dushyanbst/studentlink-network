const express = require('express');
const router = express.Router();
const { signup, login, adminSendOTP, adminVerifyOTP } = require('../controllers/authController.cjs');

router.post('/signup', signup);
router.post('/login', login);
router.post('/admin/send-otp', adminSendOTP);
router.post('/admin/verify-otp', adminVerifyOTP);

module.exports = router;
