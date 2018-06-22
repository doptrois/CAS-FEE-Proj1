export default class View {
    constructor(model) {
        this.model = model;
        this.templates = {
            note: '../hbs-templates/note.hbs',
            addEditNote: '../hbs-templates/add-edit-note.hbs',
            sort: '../hbs-templates/sort.hbs',
        };
        document.querySelector('.container').classList.add(`container--${this.model.userSettings.currentStyle}`);
    }

    // Style switcher
    changeCurrentStyle() {
        const style = this.model.userSettings.currentStyle === 'black' ? 'white' : 'black';
        document
            .querySelector('.container')
            .classList
            .replace(`container--${style}`, `container--${this.model.userSettings.currentStyle}`);
    }

    changeFinishState(id) {
        const note = document.querySelector(`[data-note-id="${id}"]`);
        note.classList.toggle('note--done');
        note.querySelector('.note__interactions-item--check').classList.toggle('note__label--checked');
        if (!this.model.userSettings.showFinished) note.classList.add('note--hidden');
    }

    expandCollapsNote(id) {
        const note = document.querySelector(`[data-note-id="${id}"]`);
        note.querySelector('.note__title').classList.toggle('note__title--expanded');
        note.querySelector('.note__paragraph').classList.toggle('note__paragraph--expanded');
    }

    hideNote(id) {
        const note = document.querySelector(`[data-note-id="${id}"]`);
        note.classList.toggle('note--hidden');
    }

    markSelectedSortOption(option) {
        document.querySelectorAll('[data-notes-sort]').forEach((el) => {
            if (el.dataset.notesSort === option) return el.classList.add('button--active');
            return el.classList.remove('button--active');
        });
    }

    markUnmarkShowFinished() {
        document.querySelector('[data-notes-show-finished]').classList.toggle('button--active');
    }

    updateShownNotes(notes) {
        const sortOption = this.model.userSettings.sortOption.toLowerCase();
        notes.map(note => Object.assign(note, { highlight: sortOption }));
        fetch(this.templates.note)
            .then(response => response.text())
            .then((data) => {
                document.querySelector('.notes').innerHTML = Handlebars.compile(data)({ notes });
            });
    }

    openAddEditView(id) {
        const note = this.model.getNote(id);
        const emptyNote = this.model.getEmptyNote();
        fetch(this.templates.addEditNote)
            .then(response => response.text())
            .then((data) => {
                if (id) {
                    document.body.insertAdjacentHTML('beforeend', Handlebars.compile(data)({ note }));
                } else {
                    document.body.insertAdjacentHTML('beforeend', Handlebars.compile(data)({ note: emptyNote }));
                }
            });
    }

    closeAddEditView() {
        document.querySelector('.modal').remove();
    }
}
