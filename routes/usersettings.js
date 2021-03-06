const express = require('express');

const router = express.Router();

const usersettingsController = require('../controller/usersettingsController');

router.get('/', usersettingsController.getSettings);
router.put('/', usersettingsController.putSettings);

module.exports = router;
