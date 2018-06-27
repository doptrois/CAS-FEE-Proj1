const store = require('../services/usersettingsStorage.js');

module.exports.getSettings = (req, res) => {
    store.get((err, docs) => {
        res.json(docs);
    });
};

module.exports.putSettings = (req, res) => {
    store.put(req.body, () => {
        store.get((err, docs) => {
            res.json(docs);
        });
    });
};
