const express = require('express');
const router = express.Router();
const { getAllNotes, createNote, downloadNote } = require('../controllers/notesController.cjs');
const { authenticate } = require('../middleware/auth.cjs');

router.get('/', authenticate, getAllNotes);
router.post('/', authenticate, createNote);
router.post('/:id/download', authenticate, downloadNote);

module.exports = router;
