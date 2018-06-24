const express = require('express');

const router = express.Router();

const notesController = require('../controller/notesController');

router.get('/', notesController.getNotes);

module.exports = router;
