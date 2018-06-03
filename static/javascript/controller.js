/* eslint-disable */
import View from './view.js';

export class Controller {
    constructor(sth) {
        this.sth = sth;
    }

    // User settings events
    onCurrentStyleChange() {}
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

export default { Controller };
