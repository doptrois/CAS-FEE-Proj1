import Storage from './storage.js';
import Model from './model.js';
import View from './view.js';
import Controller from './controller.js';

(() => {
    const init = async () => {
        const notes = await fetch('/notes');
        const notesJSON = await notes.json();

        const usersettings = await fetch('/usersettings');
        const usersettingsJSON = await usersettings.json();

        const storage = new Storage(notesJSON, usersettingsJSON);
        const model = new Model(storage);
        const view = new View(model);
        const controller = new Controller(model, view); // eslint-disable-line no-unused-vars
    };
    init();
})();
