
export default class Controller {
    constructor(model) {
        this.model = model;
        // this.view = new View();

        // Load and set saved app style
        // this.view.changeCurrentStyle();
        document.querySelector('.container').classList.add(`container--${this.model.userSettings.currentStyle}`);

        // Event handlers
        // Style switcher
        document.body.addEventListener('click', (event) => {
            const elem = event.target.closest('.button--switcher');
            if (elem) this.onCurrentStyleChange();
        });

        // Finish/Unfinish note
        document.body.addEventListener('click', (event) => {
            const elem = event.target.closest('.note__interactions-item--check');
            if (elem) this.onFinishUnfinishNote(+elem.closest('.note').dataset.noteId);
        });

        // Delete note
        document.body.addEventListener('click', (event) => {
            const elem = event.target.closest('.note__interactions-item--delete');
            if (elem) this.onDeleteNote(+elem.closest('.note').dataset.noteId);
        });

        // Expand/Collapse note
        document.body.addEventListener('click', (event) => {
            const elem = event.target.closest('.note__content');
            if (elem) this.onExpandCollapsNote(+elem.closest('.note').dataset.noteId);
        });

        // Sort notes
        document.body.addEventListener('click', (event) => {
            const elem = event.target.closest('[data-notes-sort]');
            if (elem) this.onSortOptionChange(elem.dataset.notesSort);
        });

        // Show/Hide finished
        document.body.addEventListener('click', (event) => {
            const elem = event.target.closest('[data-notes-show-finished]');
            if (elem) this.onShowFinishedChange();
        });
    }

    // User settings events
    onCurrentStyleChange() {
        // this.view.changeCurrentStyle();
        document.querySelector('.container').classList.toggle('container--white');
        this.model.setCurrentStyle();
    }
    onSortOptionChange(option) {
        this.model.setSortOption(option);

        switch (option) {
        case 'creationDate':
            this.onShowNewestNotes();
            break;
        case 'deadlineDate':
            this.onShowUpcomingNotes();
            break;
        case 'importance':
            this.onShowMostImportantNotes();
            break;
        default:
            this.onShowNewestNotes();
            break;
        }
    }
    onShowFinishedChange() {
        // this.view.XYZ();
        this.model.setShowFinished();
    }

    // Sort events
    onShowNewestNotes() {
        const notes = this.model.getNewestNotes();
        // this.view.updateShownNotes(notes);
    }
    onShowUpcomingNotes() {
        const notes = this.model.getUpcomingNotes();
        // this.view.updateShownNotes(notes);
    }
    onShowMostImportantNotes() {
        const notes = this.model.getMostImportantNotes();
        // this.view.updateShownNotes(notes);
    }

    // Note events
    onExpandCollapsNote(id) {
        const note = document.querySelector(`[data-note-id="${id}"]`);
        note.querySelector('.note__title').classList.toggle('note__title--expanded');
        note.querySelector('.note__paragraph').classList.toggle('note__paragraph--expanded');
    }
    onFinishUnfinishNote(id) {
        const note = document.querySelector(`[data-note-id="${id}"]`);
        note.classList.toggle('note--done');
        note.querySelector('.note__interactions-item--check').classList.toggle('note__label--checked');
        this.model.finishUnfinishNote(id);
    }
    onDeleteNote(id) {
        const note = document.querySelector(`[data-note-id="${id}"]`);
        note.classList.toggle('note--deleted');
        this.model.deleteNote(id);
    }
    onPutNote(contents) {}
    onPostNote(contents) {}
}
