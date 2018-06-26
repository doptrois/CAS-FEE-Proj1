// https://stackoverflow.com/questions/45018338/javascript-fetch-api-how-to-save-output-to-variable-as-an-object-not-the-prom
// https://github.com/github/fetch/issues/425
// https://www.taniarascia.com/how-to-use-the-javascript-fetch-api-to-get-json-data/
export default class Storage {
    getUserSettings() {
        return fetch('/usersettings')
            .then(response => response.json())
            .then(data => data)
            .catch(error => error);
    }

    putUserSettings(data) {
        return fetch('/usersettings', {
            body: JSON.stringify(data),
            cache: 'no-cache',
            headers: {
                'content-type': 'application/json',
                'X-HTTP-Method-Override': 'PUT',
            },
            method: 'POST',
        }).then(response => response.json());
    }

    getAllNotes() {
        return fetch('/notes')
            .then(response => response.json())
            .then(data => data)
            .catch(error => error);
    }

    getNote(id) {
        return fetch(`/note/${id}`)
            .then(response => response.json())
            .then(data => data)
            .catch(error => error);
    }

    postNote(data) {
        return fetch('/note', {
            body: JSON.stringify(data),
            cache: 'no-cache',
            headers: {
                'content-type': 'application/json',
            },
            method: 'POST',
        }).then(response => response.json());
    }

    putNote(id, data) {
        return fetch(`/note/${id}`, {
            body: JSON.stringify(data),
            cache: 'no-cache',
            headers: {
                'content-type': 'application/json',
                'X-HTTP-Method-Override': 'PUT',
            },
            method: 'POST',
        }).then(response => response.json());
    }

    deleteNote(id) {
        return fetch(`/note/${id}`, {
            cache: 'no-cache',
            headers: {
                'content-type': 'application/json',
                'X-HTTP-Method-Override': 'DELETE',
            },
            method: 'POST',
        }).then(response => response.json());
    }
}
