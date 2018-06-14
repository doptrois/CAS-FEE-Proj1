export default class View {
    constructor(model) {
        this.model = model;
        this.templates = {
            note: '../hbs-templates/note.hbs',
            editNote: '../hbs-templates/edit-note.hbs',
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
            .replace(`container--${this.model.userSettings.currentStyle}`, `container--${style}`);
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
        notes.map((note) => {
            switch (note.importance) {
            case 0:
                Object.assign(note, { importanceText: 'Not important' });
                return note;
                break; // eslint-disable-line no-unreachable
            case 1:
                Object.assign(note, { importanceText: 'Important' });
                return note;
                break; // eslint-disable-line no-unreachable
            case 2:
                Object.assign(note, { importanceText: 'Very important' });
                return note;
                break; // eslint-disable-line no-unreachable
            case 3:
                Object.assign(note, { importanceText: 'Extremely important' });
                return note;
                break; // eslint-disable-line no-unreachable
            default:
                return note;
                break; // eslint-disable-line no-unreachable
            }
        }).map((note) => {
            Object.assign(note, { highlight: this.model.userSettings.sortOption.toLowerCase() });
            return note;
        });
        fetch(this.templates.note)
            .then(response => response.text())
            .then((data) => {
                document.querySelector('.notes').innerHTML = Handlebars.compile(data)({ notes });
            });
    }
}
