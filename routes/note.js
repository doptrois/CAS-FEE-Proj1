const express = require('express');

const router = express.Router();

const noteController = require('../controller/noteController');

router.get('/:id', noteController.getNote);
router.post('/', noteController.postNote);
router.put('/:id', noteController.putNote);
router.delete('/:id', noteController.deleteNote);

module.exports = router;
