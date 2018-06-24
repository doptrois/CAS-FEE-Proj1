const store = require('../services/notesStorage.js');

module.exports.getNotes = (req, res) => {
    console.log('get notes');
    res.status(200);
    res.end();
};
