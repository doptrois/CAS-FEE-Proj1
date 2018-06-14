export default class Controller {
    constructor(model, view) {
        this.model = model;
        this.view = view;

        // Event handlers
        this.onSortOptionChange(this.model.userSettings.sortOption);
        if (this.model.userSettings.showFinished) {
            this.view.markUnmarkShowFinished();
        }

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
        this.view.changeCurrentStyle();
        this.model.setCurrentStyle();
    }
    onSortOptionChange(option) {
        this.view.markSelectedSortOption(option);
        this.model.setSortOption(option);
        const notes = this.model.getNotes(this.model.userSettings.sortOption);
        this.view.updateShownNotes(notes);
    }
    onShowFinishedChange() {
        this.model.setShowFinished();
        const notes = this.model.getNotes(this.model.userSettings.sortOption);
        this.view.markUnmarkShowFinished();
        this.view.updateShownNotes(notes);
    }

    // Note events
    onExpandCollapsNote(id) {
        this.view.expandCollapsNote(id);
    }
    onFinishUnfinishNote(id) {
        this.model.setNoteState(id, 'finished');
        this.view.changeFinishState(id);
    }
    onDeleteNote(id) {
        this.model.setNoteState(id, 'deleted');
        this.view.hideNote(id);
    }
    onPutNote(contents) {}
    onPostNote(contents) {}
}
