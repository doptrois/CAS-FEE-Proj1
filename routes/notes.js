const express = require('express');

const router = express.Router();

const notesController = require('../controller/notesController');

router.get('/', notesController.getAllNotes);

module.exports = router;
