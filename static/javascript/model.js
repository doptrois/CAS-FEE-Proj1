/* eslint-disable */
export class Model {
    constructor() {
        this.userSettings = {
            currentStyle: 'black',
            sortOption: 'newest',
            showFinished: false
        };
    }

    // User settings
    setCurrentStyle(style) {
        this.userSettings.currentStyle = style;
    }
    setSortOption(option) {
        this.userSettings.sortOption = option;
    }
    setShowFinished(yesno) {
        this.userSettings.showFinished = yesno;
    }

    // Sorted notes
    getShowNewestNotes() {}
    getShowUpcomingNotes() {}
    getShowMostImportantNotes() {}

    // Notes
    deleteNote(id) { return id; }
    putNote(contents) { return contents; }
    postNote(contents) { return contents; }
}

export default { Model };
