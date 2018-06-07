/* eslint-disable */
export default class Model {
    constructor() {

        if (!localStorage['UserSettings']) {
            // Inital user settings on first run
            var data = [
                {
                    currentStyle: 'black',
                    sortOption: 'newest',
                    showFinished: false
                }
            ];

            localStorage['UserSettings'] = JSON.stringify(data);
        }
        this.userSettings = {
            currentStyle: JSON.parse(localStorage["UserSettings"])[0]['currentStyle'],
            sortOption: JSON.parse(localStorage["UserSettings"])[0]['sortOption'],
            showFinished: JSON.parse(localStorage["UserSettings"])[0]['showFinished']
        };

        if(!localStorage.getItem('NoteItems')) {
            // Inital note items on first run
            var notes = [
                {
                    "id": 0,
                    "title": "Example One",
                    "content": "Some text",
                    "creationDate": "2018-06-02",
                    "deadlineDate": "2018-12-28",
                    "importance": 0,
                    "finished": false
                },
                {
                    "id": 1,
                    "title": "Example Two",
                    "content": "Some other text",
                    "creationDate": "2018-06-02",
                    "deadlineDate": "2018-12-23",
                    "importance": 1,
                    "finished": false
                },
                {
                    "id": 2,
                    "title": "Example Three",
                    "content": "Some other text again",
                    "creationDate": "2018-06-02",
                    "deadlineDate": "2018-12-01",
                    "importance": 2,
                    "finished": false
                },
                {
                    "id": 3,
                    "title": "Example Four",
                    "content": "Text again",
                    "creationDate": "2018-06-02",
                    "deadlineDate": "2018-10-01",
                    "importance": 3,
                    "finished": false
                },
                {
                    "id": 4,
                    "title": "Example Five",
                    "content": "The again Text again",
                    "creationDate": "2018-06-02",
                    "deadlineDate": "2018-08-12",
                    "importance": 0,
                    "finished": false
                },
                {
                    "id": 5,
                    "title": "Example Six",
                    "content": "Lorem ipsum",
                    "creationDate": "2018-06-02",
                    "deadlineDate": "2018-08-12",
                    "importance": 3,
                    "finished": true
                }
            ];

            localStorage['NoteItems'] = JSON.stringify(notes);
        }
        this.noteItems = JSON.parse(localStorage['NoteItems']);
    }

    // User settings
    setCurrentStyle() {
        if(this.userSettings.currentStyle == 'black') {
            this.userSettings.currentStyle = 'white';
            localStorage['UserSettings'] = JSON.stringify([Object.assign(JSON.parse(localStorage["UserSettings"])[0], {"currentStyle": "white"})]);
        } else {
            this.userSettings.currentStyle = 'black';
            localStorage['UserSettings'] = JSON.stringify([Object.assign(JSON.parse(localStorage["UserSettings"])[0], {"currentStyle": "black"})]);
        }
    }
    setSortOption(option) {
        this.userSettings.sortOption = option;
        localStorage['UserSettings'] = JSON.stringify([Object.assign(JSON.parse(localStorage["UserSettings"])[0], {"sortOption": option})]);
    }
    setShowFinished(yesno) {
        this.userSettings.showFinished = yesno;
        localStorage['UserSettings'] = JSON.stringify([Object.assign(JSON.parse(localStorage["UserSettings"])[0], {"showFinished": yesno})]);
    }

    // Sorted notes
    getShowNewestNotes() {}
    getShowUpcomingNotes() {}
    getShowMostImportantNotes() {}

    // Notes
    finishUnfinishNote(id) {
        this.noteItems.map((noteItem) => {
            if(noteItem.id == id) {
                const doneUndone = noteItem.finished ? false : true;
                return Object.assign(noteItem, {"finished": doneUndone});
            } else {
                return noteItem;
            };
        });
        localStorage['NoteItems'] = JSON.stringify(this.noteItems);
    }
    deleteNote(id) {
        this.noteItems = this.noteItems.filter(noteItem => noteItem.id != id);
        localStorage['NoteItems'] = JSON.stringify(this.noteItems);
    }
    putNote(contents) { return contents; }
    postNote(contents) { return contents; }
}
