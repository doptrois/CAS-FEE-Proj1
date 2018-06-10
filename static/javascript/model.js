
export default class Model {
    constructor() {
        if (!localStorage.UserSettings) {
            // Inital user settings on first run
            const data = [
                {
                    currentStyle: 'black',
                    sortOption: 'creationDate',
                    showFinished: false,
                },
            ];

            localStorage.UserSettings = JSON.stringify(data);
        }
        this.userSettings = {
            currentStyle: JSON.parse(localStorage.UserSettings)[0].currentStyle,
            sortOption: JSON.parse(localStorage.UserSettings)[0].sortOption,
            showFinished: JSON.parse(localStorage.UserSettings)[0].showFinished,
        };

        if (!localStorage.NoteItems) {
            // Inital note items on first run
            const notes = [
                {
                    id: 0,
                    title: 'Example One',
                    content: 'Some text',
                    creationDate: '2010-01-02',
                    deadlineDate: '2020-12-28',
                    importance: 0,
                    finished: false,
                },
                {
                    id: 1,
                    title: 'Example Two',
                    content: 'Some other text',
                    creationDate: '2014-06-02',
                    deadlineDate: '2015-12-23',
                    importance: 1,
                    finished: false,
                },
                {
                    id: 2,
                    title: 'Example Three',
                    content: 'Some other text again',
                    creationDate: '2012-06-02',
                    deadlineDate: '2012-12-01',
                    importance: 2,
                    finished: false,
                },
                {
                    id: 3,
                    title: 'Example Four',
                    content: 'Text again',
                    creationDate: '2014-06-02',
                    deadlineDate: '2028-10-01',
                    importance: 3,
                    finished: false,
                },
                {
                    id: 4,
                    title: 'Example Five',
                    content: 'The again Text again',
                    creationDate: '2009-06-02',
                    deadlineDate: '2018-12-29',
                    importance: 0,
                    finished: false,
                },
                {
                    id: 5,
                    title: 'Example Six',
                    content: 'Lorem ipsum',
                    creationDate: '2001-06-02',
                    deadlineDate: '2018-09-14',
                    importance: 3,
                    finished: true,
                },
            ];

            localStorage.NoteItems = JSON.stringify(notes);
        }
        this.noteItems = JSON.parse(localStorage.NoteItems);
    }

    // User settings
    setCurrentStyle() {
        const style = this.userSettings.currentStyle === 'black' ? 'white' : 'black';
        this.userSettings.currentStyle = style;
        localStorage.UserSettings = JSON.stringify([
            Object.assign(JSON.parse(localStorage.UserSettings)[0], { currentStyle: style }),
        ]);
    }
    setSortOption(option) {
        this.userSettings.sortOption = option;
        localStorage.UserSettings = JSON.stringify([
            Object.assign(JSON.parse(localStorage.UserSettings)[0], { sortOption: option }),
        ]);
    }
    setShowFinished() {
        const yesno = !this.userSettings.showFinished;
        this.userSettings.showFinished = yesno;
        localStorage.UserSettings = JSON.stringify([
            Object.assign(JSON.parse(localStorage.UserSettings)[0], { showFinished: yesno }),
        ]);
    }

    // Sorted notes
    getNewestNotes() {
        return this.noteItems.sort((a, b) => {
            const timestampA = Date.parse(new Date(a.creationDate.split('-')[0], a.creationDate.split('-')[1], a.creationDate.split('-')[2]));
            const timestampB = Date.parse(new Date(b.creationDate.split('-')[0], b.creationDate.split('-')[1], b.creationDate.split('-')[2]));
            return timestampA < timestampB;
        }).filter(noteItem => noteItem.finished === this.userSettings.showFinished);
    }
    getUpcomingNotes() {
        return this.noteItems.sort((a, b) => {
            const timestampA = Date.parse(new Date(a.deadlineDate.split('-')[0], a.deadlineDate.split('-')[1], a.deadlineDate.split('-')[2]));
            const timestampB = Date.parse(new Date(b.deadlineDate.split('-')[0], b.deadlineDate.split('-')[1], b.deadlineDate.split('-')[2]));
            return timestampA > timestampB;
        }).filter(noteItem => noteItem.finished === this.userSettings.showFinished);
    }
    getMostImportantNotes() {
        return this.noteItems
            .sort((a, b) => a.importance < b.importance)
            .filter(noteItem => noteItem.finished === this.userSettings.showFinished);
    }

    // Notes
    finishUnfinishNote(id) {
        this.noteItems.map((noteItem) => {
            if (noteItem.id === id) {
                return Object.assign(noteItem, { finished: !noteItem.finished });
            }
            return noteItem;
        });
        localStorage.NoteItems = JSON.stringify(this.noteItems);
    }
    deleteNote(id) {
        this.noteItems = this.noteItems.filter(noteItem => noteItem.id !== id);
        localStorage.NoteItems = JSON.stringify(this.noteItems);
    }
    putNote(contents) { return contents; }
    postNote(contents) { return contents; }
}
