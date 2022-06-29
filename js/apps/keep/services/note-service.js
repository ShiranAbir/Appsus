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
    removeNote,
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
                style: {
                    backgroundColor: "#00d"
                }
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

// function get(bookId) {
//     return storageService.get(BOOKS_KEY, bookId)
// }


// function save(book) {
//     if (book.id) return storageService.put(BOOKS_KEY, book)
//     else return storageService.post(BOOKS_KEY, book)
// }


// function getEmptyReview() {
//     return { bookTitle: "", fullName: "", stars: "", date: "", bookReview: "", }
// }

// function addReview(bookId, review) {
//     review.id = utilService.makeId()
//     return get(bookId)
//         .then(book => {
//             if (!book.reviews) book.reviews = []
//             book.reviews.push(review)
//             return storageService.put(BOOKS_KEY, book)
//         })

// }

function removeNote(noteId) {
    return storageService.remove(NOTES_KEY, noteId)

    // get(noteId)
    //     .then(note => {
    //         const idx = note.reviews.findIndex(review => review.id === reviewId)
    //         book.reviews.splice(idx, 1)
    //         return storageService.put(NOTES_KEY, NOTES)
    //     })
}

// function getNextBookId(bookId) {
//     return storageService.query(BOOKS_KEY)
//         .then(books => {
//             const idx = books.findIndex(book => book.id === bookId) //מחזיר אינדקס של הספר שעונה עך הבדיקה
//             return (idx < books.length - 1) ? books[idx + 1].id : books[0].id

//         }) //מחזיר ספר עם אינדקס גדול ב1

// }