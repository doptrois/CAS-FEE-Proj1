export default class Model {
    constructor(storage, notes, usersettings) {
        this.storage = storage;
        this.userSettings = usersettings[0]; // eslint-disable-line prefer-destructuring
        this.noteItems = notes;
    }

    getEmptyNote() {
        return [
            {
                _id: '',
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
        this.storage.putUserSettings({ currentStyle: style });
    }
    setSortOption(option) {
        this.userSettings.sortOption = option;
        this.storage.putUserSettings({ sortOption: option });
    }
    setShowFinished() {
        const yesno = !this.userSettings.showFinished;
        this.userSettings.showFinished = yesno;
        this.storage.putUserSettings({ showFinished: yesno });
    }

    // Note get
    getNote(id) {
        return this.noteItems.filter(note => note._id === id); // eslint-disable-line no-underscore-dangle, max-len
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
            if (noteItem._id === id) { // eslint-disable-line no-underscore-dangle
                if (property === 'finished') {
                    this.storage.putNote(id, { finished: !noteItem.finished });
                    return Object.assign(noteItem, { finished: !noteItem.finished });
                }
                this.storage.deleteNote(id);
                if (property === 'deleted') return Object.assign(noteItem, { deleted: true });
            }
            return noteItem;
        });
    }

    saveNote(noteData) {
        if (!noteData._id) { // eslint-disable-line no-underscore-dangle
            delete noteData._id; // eslint-disable-line no-underscore-dangle, no-param-reassign
            Object.assign(noteData, {
                creationDate: (new Date()).toISOString().split('T')[0],
                finished: false,
                deleted: false,
            });
            this.storage.postNote(noteData).then((response) => {
                this.noteItems.push(response);
                // da mues dview gupdatet wärde..
            });
        } else {
            this.noteItems.map((noteItem) => {
                if (noteItem._id === noteData._id) { // eslint-disable-line no-underscore-dangle
                    return Object.assign(noteItem, {
                        title: noteData.title,
                        content: noteData.content,
                        deadlineDate: noteData.deadlineDate,
                        importance: noteData.importance,
                    });
                }
                return noteItem;
            });
            this.storage.putNote(noteData._id, noteData); // eslint-disable-line no-underscore-dangle, max-len
        }
    }
}
