export default class Controller {
    constructor(model, view) {
        this.model = model;
        this.view = view;

        this.onSortOptionChange(this.model.userSettings.sortOption);
        if (this.model.userSettings.showFinished) {
            this.view.markUnmarkShowFinished();
        }

        // Event handlers
        document.body.addEventListener('click', (e) => {
            // Style switcher
            const switcher = e.target.closest('.button--switcher');
            if (switcher) this.onCurrentStyleChange();

            // Finish/Unfinish note
            const finish = e.target.closest('.note__interactions-item--check');
            if (finish) this.onFinishUnfinishNote(+finish.closest('.note').dataset.noteId);

            // Delete note
            const del = e.target.closest('.note__interactions-item--delete');
            if (del) this.onDeleteNote(+del.closest('.note').dataset.noteId);

            // Expand/Collapse note
            const cont = e.target.closest('.note__content');
            if (cont) this.onExpandCollapsNote(+cont.closest('.note').dataset.noteId);

            // Sort notes
            const sort = e.target.closest('[data-notes-sort]');
            if (sort) this.onSortOptionChange(sort.dataset.notesSort);

            // Show/Hide finished
            const showHide = e.target.closest('[data-notes-show-finished]');
            if (showHide) this.onShowFinishedChange();
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
