const express = require('express');

const router = express.Router();

router.get('/', (req, res, next) => {
    res.json({
        currentStyle: 'black',
        sortOption: 'creationDate',
        showFinished: false,
    });
});

module.exports = router;
