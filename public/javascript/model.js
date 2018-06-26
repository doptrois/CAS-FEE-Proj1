export default class Model {
    constructor(storage, notes, usersettings) {
        this.storage = storage;
        this.userSettings = usersettings[0]; // eslint-disable-line prefer-destructuring
        this.noteItems = notes;
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
        // GET
        return this.noteItems.filter(note => note.id === id);
    }

    // Sorted notes
    getNotes(option) {
        // GET
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
                // PUT
                if (property === 'finished') {
                    this.storage.putNote(id, { finished: !noteItem.finished });
                    return Object.assign(noteItem, { finished: !noteItem.finished });
                }
                // DELETE
                this.storage.deleteNote(id);
                if (property === 'deleted') return Object.assign(noteItem, { deleted: true });
            }
            return noteItem;
        });
    }

    saveNote(noteData) {
        if (noteData.id === this.noteItems.length) {
            // POST
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
            // localStorage.NoteItems = JSON.stringify(this.noteItems);
        } else {
            // PUT
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
            // localStorage.NoteItems = JSON.stringify(this.noteItems);
        }
    }
}
