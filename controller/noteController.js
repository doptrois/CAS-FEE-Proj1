const store = require('../services/notesStorage.js');

module.exports.getNote = (req, res) => {
    console.log(req.params.id);
    console.log('get note');
    res.status(200);
    res.end();
};

module.exports.postNote = (req, res) => {
    console.log(req.body);
    console.log('post note');
    res.status(200);
    res.end();
};

module.exports.putNote = (req, res) => {
    console.log(req.body);
    console.log(req.params.id);
    console.log('put note');
    res.status(200);
    res.end();
};

module.exports.deleteNote = (req, res) => {
    console.log(req.params.id);
    console.log('delete note');
    res.status(200);
    res.end();
};
