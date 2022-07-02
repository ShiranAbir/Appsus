import { utilService } from '../../../services/util-service.js';
import { storageService } from '../../../services/async-storage-service.js';

const NOTES_KEY = 'notes';
_createNotes();

export const noteService = {
    query, //מביא את כל הספרים
    get, //שמה איידי ומקבלת את הספר המתאים
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
    editNoteBGColor,
    pinNote,
    duplicateNote,
    getEmptyAudioNote,
};

function get(noteId) {
    return storageService.get(NOTES_KEY, noteId)
}

function editNoteBGColor(note, color) {
    note.bGC = color
    return storageService.put(NOTES_KEY, note)
}

function pinNote(noteId) {
    return get(noteId)
        .then((note) => {

            note.isPinned = !note.isPinned
            return storageService.put(NOTES_KEY, note)
        })
        // const updateNote = {...note }
        // updateNote.isPinned = !updateNote.isPinned
        // return storageService.put(NOTES_KEY, updateNote)
}

function duplicateNote(noteId) {
    return get(noteId)
        .then((note) => {
            console.log('note', note)
            return storageService.post(NOTES_KEY, note)

        })


}


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
                title: "Hello",
                type: "note-txt",
                isPinned: false,
                info: {
                    txt: "Fullstack Me Baby!"
                },
            },
            {
                id: "n109",
                title: "Video game",
                type: "note-vid",
                isPinned: false,
                info: {
                    vidUrl: "https://www.youtube.com/embed/ki3jIHa1M2s"
                }

            },
            {
                id: "n111",
                title: "Audio",
                type: "note-audio",
                isPinned: false,
                info: {
                    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
                }

            },
            {
                id: "n110",
                title: "Pizza",
                type: "note-vid",
                isPinned: false,
                info: {
                    vidUrl: "https://www.youtube.com/embed/LG-9SaCUmu8"
                }

            },
            {
                id: "n102",
                title: "My MOMs Elephant",
                type: "note-img",
                info: {
                    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/Desert_elephant_%28Loxodonta_africana%29_male.jpg/375px-Desert_elephant_%28Loxodonta_africana%29_male.jpg",
                    title: "Bobi and Me"
                },

            },
            {
                id: "n101",
                title: "I Love You",
                type: "note-txt",
                isPinned: false,
                info: {
                    txt: "Fullstack Me Baby!"
                }
            },
            {
                id: "n102",
                title: "Cupssss",
                type: "note-img",
                info: {
                    url: "https://mytrivia.co.il/wp-content/uploads/2019/12/%D7%95%D7%A8%D7%93.jpg",
                    title: "Bobi and Me"
                },

            },
            {
                id: "n103",
                title: "I hate Cleaning",
                type: "note-todos",
                info: {
                    label: "Get my stuff together",
                    isDone: false,
                    todos: [
                        { txt: "Driving liscence", isDone: false },
                        { txt: "Coding power", isDone: false }
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
        title: null,
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
        title: null,
        type: "note-img",
        info: {
            url: "",
        },

    }
}

function getEmptyVidNote() {
    return {
        id: utilService.makeId(),
        title: null,
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
        title: null,
        type: "note-todos",
        info: {
            label: "Get my stuff together",
            isDone: false,

            todos: [
                { txt: "Driving liscence", isDone: false },
                { txt: "Coding power", isDone: false }
            ]
        }
    }

}

function getEmptyAudioNote() {
    return {
        id: utilService.makeId(),
        title: null,
        type: "note-audio",
        isPinned: false,
        info: {
            url: "",
        }

    }

}


function removeNote(noteId) {
    return storageService.remove(NOTES_KEY, noteId)
}