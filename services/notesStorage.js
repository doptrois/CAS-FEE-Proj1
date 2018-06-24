const Datastore = require('nedb');

const db = new Datastore({ filename: './data/notes.db', autoload: true });

module.exports.getAllNotes = (callback) => {
    db.find({}, (err, docs) => {
        if (callback) callback(err, docs);
    });
};

module.exports.getNote = (id, callback) => {
    db.find({ _id: id }, (err, docs) => {
        if (callback) callback(err, docs);
    });
};

module.exports.postNote = (req, callback) => {
    db.insert(req, (err, docs) => {
        if (callback) callback(err, docs);
    });
};

module.exports.putNote = (id, req, callback) => {
    db.update({ _id: id }, { $set: req }, (err, docs) => {
        if (callback) callback(err, docs);
    });
};

module.exports.deleteNote = (id, callback) => {
    db.update({ _id: id }, { $set: { deleted: true } }, (err, docs) => {
        if (callback) callback(err, docs);
    });
};
