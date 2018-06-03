/* eslint-disable */
export class LocalStorageModel {
    constructor() {
        this.initialNotes = [
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
                "importance": 3,
                "finished": true
            }
        ];
    }
}

export default { LocalStorageModel };
