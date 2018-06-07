/* eslint-disable */
export default class Controller {
    constructor(model) {
        this.model = model;

        // Load and set saved app style
        document.querySelector('.container').classList.add('container--' + this.model.userSettings.currentStyle);

        // Event handlers
        document.body.addEventListener('click', (event) => {
            let elem = event.target.closest('.button--switcher');
            if(elem) {
                document.querySelector('.container').classList.toggle('container--white');
                this.onCurrentStyleChange();
            }
        });

        document.body.addEventListener('click', (event) => {
            let elem = event.target.closest('.note__interactions-item--check');
            if(elem) {
                this.onFinishUnfinishNote(elem.closest('.note').dataset.noteId);
            }
        });

        document.body.addEventListener('click', (event) => {
            let elem = event.target.closest('.note__interactions-item--delete');
            if(elem) {
                this.onDeleteNote(elem.closest('.note').dataset.noteId)
            }
        });
    }

    // User settings events
    onCurrentStyleChange() {
        this.model.setCurrentStyle();
    }
    onSortOptionChange() {}
    onShowFinishedChange() {}

    // Sort events
    onShowNewestNotes() {}
    onShowUpcomingNotes() {}
    onShowMostImportantNotes() {}

    // Note events
    onFinishUnfinishNote(id) {
        let note = document.querySelector('[data-note-id="' + id + '"]');
        note.classList.toggle('note--done');
        note.querySelector('.note__interactions-item--check').classList.toggle('note__label--checked');
        this.model.finishUnfinishNote(id);
    }
    onDeleteNote(id) {
        let note = document.querySelector('[data-note-id="' + id + '"]');
        note.classList.toggle('note--deleted');
        this.model.deleteNote(id);
    }
    onPutNote(contents) {}
    onPostNote(contents) {}
}
