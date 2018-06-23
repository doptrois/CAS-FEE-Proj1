export default class Storage {
    constructor() {
        this.UserSettings = (() => {
            fetch('/usersettings')
                .then(response => response.json())
                .then(data => data)
                .catch(error => error);
        })();
        this.NoteItems = (() => {
            fetch('/notes')
                .then(response => response.json())
                .then(data => data)
                .catch(error => error);
        })();
    }
}
