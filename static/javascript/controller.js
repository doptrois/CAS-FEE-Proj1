/* eslint-disable */
export default class Controller {
    constructor(model) {
        this.model = model;
        console.log(model);
        document.querySelector('.button--switcher').addEventListener('click', function(event) {
            document.querySelector('.container').classList.toggle('container--layout-day');
            Controller.onCurrentStyleChange();
        });
    }

    // User settings events
    static onCurrentStyleChange() {
        console.log(this.model);
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
