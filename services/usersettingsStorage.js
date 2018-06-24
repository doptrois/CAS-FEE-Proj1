const Datastore = require('nedb');

const db = new Datastore({ filename: './data/usersettings.db', autoload: true });

module.exports.get = (callback) => {
    db.find({}, (err, docs) => {
        if (callback) callback(err, docs);
    });
};

module.exports.put = (req, callback) => {
    db.find({}, (err, docs) => {
        db.update({ _id: docs[0]._id }, { $set: req }); // eslint-disable-line no-underscore-dangle
        if (callback) callback(err, docs);
    });
};
