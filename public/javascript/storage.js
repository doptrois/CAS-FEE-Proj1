
export default class Storage {
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
