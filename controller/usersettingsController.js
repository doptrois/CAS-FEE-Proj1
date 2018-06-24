const store = require('../services/notesStorage.js');

module.exports.getSettings = (req, res) => {
    console.log('get usersettings');
    res.status(200);
    res.end();
};

module.exports.postSettings = (req, res) => {
    console.log(req.body);
    console.log('post usersettings');
    res.status(200);
    res.end();
};

module.exports.putSettings = (req, res) => {
    console.log(req.body);
    console.log('put usersettings');
    res.status(200);
    res.end();
};
