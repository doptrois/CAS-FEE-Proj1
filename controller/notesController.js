const store = require('../services/notesStorage.js');

module.exports.getAllNotes = (req, res) => {
    store.getAllNotes((err, docs) => {
        res.json(docs);
    });
};

module.exports.getNote = (req, res) => {
    store.getNote(req.params.id, (err, docs) => {
        res.json(docs);
    });
};

module.exports.postNote = (req, res) => {
    store.postNote(req.body, (err, docs) => {
        res.json(docs);
    });
};

module.exports.putNote = (req, res) => {
    store.putNote(req.params.id, req.body, () => {
        store.getNote(req.params.id, (err, docs) => {
            res.json(docs);
        });
    });
};

module.exports.deleteNote = (req, res) => {
    store.deleteNote(req.params.id, (err, docs) => {
        res.json(docs);
    });
};
