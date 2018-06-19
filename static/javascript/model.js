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
                    deleted: false,
                },
                {
                    id: 1,
                    title: 'Example Two',
                    content: 'Some other text',
                    creationDate: '2014-06-02',
                    deadlineDate: '2015-12-23',
                    importance: 1,
                    finished: false,
                    deleted: false,
                },
                {
                    id: 2,
                    title: 'Example Three',
                    content: 'Some other text again',
                    creationDate: '2012-06-02',
                    deadlineDate: '2012-12-01',
                    importance: 2,
                    finished: false,
                    deleted: false,
                },
                {
                    id: 3,
                    title: 'Example Four',
                    content: 'Text again',
                    creationDate: '2014-06-02',
                    deadlineDate: '2028-10-01',
                    importance: 3,
                    finished: false,
                    deleted: false,
                },
                {
                    id: 4,
                    title: 'Example Five',
                    content: 'The again Text again',
                    creationDate: '2009-06-02',
                    deadlineDate: '2018-12-29',
                    importance: 0,
                    finished: false,
                    deleted: false,
                },
                {
                    id: 5,
                    title: 'Example Six',
                    content: 'Lorem ipsum',
                    creationDate: '2001-06-02',
                    deadlineDate: '2018-09-14',
                    importance: 3,
                    finished: true,
                    deleted: false,
                },
                {
                    id: 6,
                    title: 'Example Seven',
                    content: 'Lorem ipsum',
                    creationDate: '2014-06-02',
                    deadlineDate: '2018-09-14',
                    importance: 2,
                    finished: false,
                    deleted: false,
                },
                {
                    id: 7,
                    title: 'Example Eight',
                    content: 'Lorem ipsum',
                    creationDate: '2014-06-02',
                    deadlineDate: '2018-09-14',
                    importance: 0,
                    finished: false,
                    deleted: false,
                },
                {
                    id: 8,
                    title: 'Example Nine',
                    content: 'Lorem ipsum',
                    creationDate: '2012-06-02',
                    deadlineDate: '2018-09-14',
                    importance: 3,
                    finished: false,
                    deleted: false,
                },
                {
                    id: 9,
                    title: 'Example Ten',
                    content: 'Lorem ipsum',
                    creationDate: '2012-11-02',
                    deadlineDate: '2012-12-01',
                    importance: 3,
                    finished: false,
                    deleted: false,
                },
                {
                    id: 10,
                    title: 'Example Eleven',
                    content: 'Lorem ipsum',
                    creationDate: '2012-11-02',
                    deadlineDate: '2012-12-01',
                    importance: 1,
                    finished: false,
                    deleted: false,
                },
                {
                    id: 11,
                    title: 'Example Twelve',
                    content: 'Lorem ipsum',
                    creationDate: '2012-11-02',
                    deadlineDate: '2012-12-01',
                    importance: 0,
                    finished: false,
                    deleted: false,
                },
                {
                    id: 12,
                    title: 'Example with an enormous amount of text. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
                    content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
                    creationDate: '2018-06-14',
                    deadlineDate: '2035-01-14',
                    importance: 0,
                    finished: false,
                    deleted: false,
                },
            ];

            localStorage.NoteItems = JSON.stringify(notes);
        }
        this.noteItems = JSON.parse(localStorage.NoteItems);
    }

    getEmptyNote() {
        return [
            {
                id: this.noteItems.length,
                title: '',
                content: '',
                creationDate: (new Date()).toISOString().split('T')[0],
                deadlineDate: (new Date()).toISOString().split('T')[0],
                importance: 0,
                finished: false,
                deleted: false,
            },
        ];
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

    // Note get
    getNote(id) {
        return this.noteItems.filter(note => note.id === id);
    }

    // Sorted notes
    getNotes(option) {
        return this.noteItems.filter((noteItem) => {
            if (this.userSettings.showFinished && !noteItem.deleted) return true;
            return noteItem.finished === false && !noteItem.deleted;
        }).sort((a, b) => {
            if (option === 'creationDate') {
                const [a1, a2] = [new Date(a.creationDate), a.importance];
                const [b1, b2] = [new Date(b.creationDate), b.importance];
                return b1 - a1 || b2 - a2;
            }
            const [a1, a2] = [new Date(a.deadlineDate), a.importance];
            const [b1, b2] = [new Date(b.deadlineDate), b.importance];
            if (option === 'deadlineDate') return a1 - b1 || b2 - a2;
            return b2 - a2 || a1 - b1;
        });
    }

    // Notes
    setNoteState(id, property) {
        this.noteItems.map((noteItem) => {
            if (noteItem.id === id) {
                if (property === 'finished') return Object.assign(noteItem, { finished: !noteItem.finished });
                if (property === 'deleted') return Object.assign(noteItem, { deleted: true });
            }
            return noteItem;
        });
        localStorage.NoteItems = JSON.stringify(this.noteItems);
    }

    saveNote(noteData) {
        debugger;
        if (noteData.id === this.noteItems.length) {
            this.noteItems.push({
                id: noteData.id,
                title: noteData.title,
                content: noteData.content,
                creationDate: (new Date()).toISOString().split('T')[0],
                deadlineDate: noteData.deadlineDate,
                importance: noteData.importance,
                finished: false,
                deleted: false,
            });
            localStorage.NoteItems = JSON.stringify(this.noteItems);
        } else {
            this.noteItems.map((noteItem) => {
                if (noteItem.id === noteData.id) {
                    return Object.assign(noteItem, {
                        title: noteData.title,
                        content: noteData.content,
                        deadlineDate: noteData.deadlineDate,
                        importance: noteData.importance,
                    });
                }
                return noteItem;
            });
            localStorage.NoteItems = JSON.stringify(this.noteItems);
        }
    }
}
