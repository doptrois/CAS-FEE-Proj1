const express = require('express');

const router = express.Router();

router.get('/', (req, res, next) => {
    res.json([
        {
            id: 10,
            title: '',
            content: '',
            creationDate: (new Date()).toISOString().split('T')[0],
            deadlineDate: (new Date()).toISOString().split('T')[0],
            importance: 0,
            finished: false,
            deleted: false,
        },
    ]);
});

module.exports = router;
