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
    }

    expandCollapsNote(id) {
        const note = document.querySelector(`[data-note-id="${id}"]`);
        note.querySelector('.note__title').classList.toggle('note__title--expanded');
        note.querySelector('.note__paragraph').classList.toggle('note__paragraph--expanded');
    }

    hideNote(id) {
        const note = document.querySelector(`[data-note-id="${id}"]`);
        note.classList.toggle('note--deleted');
    }

    updateShownNotes(notes) {
        fetch(this.templates.note)
            .then(response => response.text())
            .then(data => console.log(Handlebars.compile(data)({ notes })));
    }
}
