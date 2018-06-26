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
            if (finish) this.onFinishUnfinishNote(finish.closest('.note').dataset.noteId);

            // Delete note
            const del = e.target.closest('.note__edit--delete');
            if (del) this.onDeleteNote(del.closest('.note').dataset.noteId);

            // Expand/Collapse note
            const cont = e.target.closest('.note__content');
            if (cont) this.onExpandCollapsNote(cont.closest('.note').dataset.noteId);

            // Sort notes
            const sort = e.target.closest('[data-notes-sort]');
            if (sort) this.onSortOptionChange(sort.dataset.notesSort);

            // Show/Hide finished
            const showHide = e.target.closest('[data-notes-show-finished]');
            if (showHide) this.onShowFinishedChange();

            // Add note
            const btnAdd = e.target.closest('.button--add');
            if (btnAdd) this.view.openAddEditView();

            // Edit note
            const btnEdit = e.target.closest('.note__edit--edit');
            if (btnEdit) this.view.openAddEditView(btnEdit.closest('.note').dataset.noteId);

            // Cancel note
            const cancelNote = e.target.closest('.button--cancel-note');
            if (cancelNote) this.view.closeAddEditView();

            // Save note
            const saveNote = e.target.closest('.button--save-note');
            if (saveNote) this.onSaveNote();
        });
    }

    // User settings events
    onCurrentStyleChange() {
        this.model.setCurrentStyle();
        this.view.changeCurrentStyle();
    }

    onSortOptionChange(option) {
        this.model.setSortOption(option);
        this.view.markSelectedSortOption(option);
        const notes = this.model.getNotes(this.model.userSettings.sortOption);
        this.view.updateShownNotes(notes);
    }

    onShowFinishedChange() {
        this.model.setShowFinished();
        this.view.markUnmarkShowFinished();
        const notes = this.model.getNotes(this.model.userSettings.sortOption);
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

    onSaveNote() {
        const _id = document.getElementById('add-edit__note-id').value; // eslint-disable-line no-underscore-dangle
        const title = document.getElementById('add-edit__title').value;
        const content = document.getElementById('add-edit__desciption').value;
        const deadlineDate = document.getElementById('add-edit__date').value;
        const importance = +document.querySelector('[name="add-edit__importance"]:checked').value;
        this.model.saveNote({
            _id, title, content, deadlineDate, importance,
        }, () => {
            this.view.closeAddEditView();
            this.onSortOptionChange(this.model.userSettings.sortOption);
        });
    }
}
