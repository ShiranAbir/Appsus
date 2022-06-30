import { utilService } from '../../../services/util-service.js';
import { storageService } from '../../../services/async-storage-service.js';

const NOTES_KEY = 'notes';
_createNotes();

export const noteService = {
    query, //מביא את כל הספרים
    // get, //שמה איידי ומקבלת את הספר המתאים
    // addReview,
    // getEmptyReview,
    // removeReview,
    // queryGoogleBooks,
    // save,
    // addGoogleBook,
    // getNextBookId,
    getEmptyImgNote,
    addNote,
    removeNote,
    getEmptyTextNote,
    getEmptyVidNote,
    getEmptyTodoNote,
};


function query() {
    return storageService.query(NOTES_KEY)
        // .then()
        // return utilService.loadFromStorage(BOOKS_KEY);
}


function _createNotes() {
    let notes = utilService.loadFromStorage(NOTES_KEY);
    if (!notes || !notes.length) {
        notes = [{
                id: "n101",
                type: "note-txt",
                isPinned: true,
                info: {
                    txt: "Fullstack Me Baby!"
                }
            },
            {
                id: "n109",
                type: "note-vid",
                isPinned: false,
                info: {
                    vidUrl: "https://www.youtube.com/embed/9YffrCViTVk"
                }

            },
            {
                id: "n110",
                type: "note-vid",
                isPinned: false,
                info: {
                    vidUrl: "https://www.youtube.com/embed/LG-9SaCUmu8"
                }

            },
            {
                id: "n102",
                type: "note-img",
                info: {
                    url: "https://mytrivia.co.il/wp-content/uploads/2019/12/%D7%95%D7%A8%D7%93.jpg",
                    title: "Bobi and Me"
                },
                style: {
                    backgroundColor: "#00d"
                }
            },
            {
                id: "n101",
                type: "note-txt",
                isPinned: true,
                info: {
                    txt: "Fullstack Me Baby!"
                }
            },
            {
                id: "n102",
                type: "note-img",
                info: {
                    url: "https://mytrivia.co.il/wp-content/uploads/2019/12/%D7%95%D7%A8%D7%93.jpg",
                    title: "Bobi and Me"
                },

            },
            {
                id: "n103",
                type: "note-todos",
                info: {
                    label: "Get my stuff together",
                    todos: [
                        { txt: "Driving liscence", doneAt: null },
                        { txt: "Coding power", doneAt: 187111111 }
                    ]
                }
            }
        ];


        utilService.saveToStorage(NOTES_KEY, notes);
    }
    return notes;
}

function addNote(note) {
    return storageService.post(NOTES_KEY, note)

}

function getEmptyTextNote() {
    return {
        id: utilService.makeId(),
        type: "note-txt",
        isPinned: false,
        info: {
            txt: ""
        }
    }
}

function getEmptyImgNote() {
    return {
        id: utilService.makeId(),
        type: "note-img",
        info: {
            url: "",
            title: ""
        },

    }
}

function getEmptyVidNote() {
    return {
        id: utilService.makeId(),
        type: "note-vid",
        isPinned: false,
        info: {
            vidUrl: "",
        }

    }

}

function getEmptyTodoNote() {
    return {
        id: utilService.makeId(),
        type: "note-todos",
        info: {
            label: "Get my stuff together",

            todos: [
                { txt: "Driving liscence", doneAt: null },
                { txt: "Coding power", doneAt: 187111111 }
            ]
        }
    }

}


function removeNote(noteId) {
    return storageService.remove(NOTES_KEY, noteId)


}