export default class Controller {
    constructor(model, view) {
        this.model = model;
        this.view = view;

        // Event handlers
        this.view.markSelectedSortOption(this.model.userSettings.sortOption);
        switch (this.model.userSettings.sortOption) {
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
        }
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
        this.model.setShowFinished();
        const notes = (() => {
            switch (this.model.userSettings.sortOption) {
            case 'creationDate':
                return this.model.getNewestNotes();
                break; // eslint-disable-line no-unreachable
            case 'deadlineDate':
                return this.model.getUpcomingNotes();
                break; // eslint-disable-line no-unreachable
            case 'importance':
                return this.model.getMostImportantNotes();
                break; // eslint-disable-line no-unreachable
            default:
                return this.model.getNewestNotes();
                break; // eslint-disable-line no-unreachable
            }
        })();
        this.view.markUnmarkShowFinished();
        this.view.updateShownNotes(notes);
    }

    // Sort events
    onShowNewestNotes() {
        const notes = this.model.getNewestNotes();
        this.view.updateShownNotes(notes);
    }
    onShowUpcomingNotes() {
        const notes = this.model.getUpcomingNotes();
        this.view.updateShownNotes(notes);
    }
    onShowMostImportantNotes() {
        const notes = this.model.getMostImportantNotes();
        this.view.updateShownNotes(notes);
    }

    // Note events
    onExpandCollapsNote(id) {
        this.view.expandCollapsNote(id);
    }
    onFinishUnfinishNote(id) {
        this.model.finishUnfinishNote(id);
        this.view.changeFinishState(id);
    }
    onDeleteNote(id) {
        this.model.deleteNote(id);
        this.view.hideNote(id);
    }
    onPutNote(contents) {}
    onPostNote(contents) {}
}
