import Model from './model.js';
import View from './view.js';
import Controller from './controller.js';

(() => {
    const model = new Model();
    const view = new View(model);
    const controller = new Controller(model, view); // eslint-disable-line no-unused-vars
})();
