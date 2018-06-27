const express = require('express');

const router = express.Router();

const notesController = require('../controller/notesController');

router.get('/:id', notesController.getNote);
router.post('/', notesController.postNote);
router.put('/:id', notesController.putNote);
router.delete('/:id', notesController.deleteNote);

module.exports = router;
