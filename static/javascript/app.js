
import Model from './model.js';
import Controller from './controller.js';

(() => {
    const model = new Model();
    const controller = new Controller(model); // eslint-disable-line
})();
