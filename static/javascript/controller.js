/* eslint-disable */
export default class Controller {
    constructor(model) {
        document.querySelector('.button--switcher').addEventListener('click', () => {
            document.querySelector('.container').classList.toggle('container--layout-day');
            Controller.onCurrentStyleChange(model);
        });
    }

    // User settings events
    static onCurrentStyleChange(model) {
        model.setCurrentStyle();
        // model.setCurrentStyle();
    }
    onSortOptionChange() {}
    onShowFinishedChange() {}

    // Sort events
    onShowNewestNotes() {}
    onShowUpcomingNotes() {}
    onShowMostImportantNotes() {}

    // Note events
    onDeleteNote(id) {}
    onPutNote(contents) {}
    onPostNote(contents) {}
}
