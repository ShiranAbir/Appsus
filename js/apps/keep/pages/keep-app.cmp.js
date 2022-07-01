import { noteService } from "../services/note-service.js";

import noteList from "../cmps/note-list.cmp.js";
import addNote from "../cmps/add-note.cmp.js";
import noteFilter from "../cmps/note-filter.cmp.js";

export default {
    template: `
    <note-filter @filtered="filterNote"  :notes="notes"/>
    <add-note @addNewNote="addNewNote" />
    <section class="keep-app" >
   
    <note-list :notes="notesToDisplay" @remove="removeNote" @pinNote="pinNote" @changeBGColor="changeBGC" @duplicateNote="duplicateNote"/>

    </section>
  `,
    components: {
        noteList,
        addNote,
        noteFilter,
    },
    data() {
        return {
            notes: [],
            filterBy: {},

        };
    },
    created() {
        noteService.query().then(
            notes => {
                this.notes = notes
                console.log('notes', this.notes)
            })

    },

    methods: {
        removeNote(id) {
            noteService.removeNote(id)
                .then(() => {
                    const idx = this.notes.findIndex((note) => note.id === id);
                    this.notes.splice(idx, 1);
                })
        },
        pinNote(noteId) {
            // this.notes[this.notes.length - 1].isPinned = true
            noteService.pinNote(noteId)
                .then(() => {
                    const idx = this.notes.findIndex((note) => note.id === noteId);
                    this.notes[idx].isPinned = !this.notes[idx].isPinned
                })
        },
        changeBGC(note, newBGC) {
            noteService.editNoteBGColor(note, newBGC)
                .then(() => {
                    const idx = this.notes.findIndex((note) => note.id === id);
                    this.notes[idx].bGC = newBGC
                })
        },
        duplicateNote(noteId) {
            // console.log(noteId)
            noteService.duplicateNote(noteId)
                .then((duplicatedNote) => {
                    console.log('hhhhhhhhhhh')
                        // const idx = this.notes.findIndex((note) => note.id === noteId);
                    this.notes.unshift(duplicatedNote)
                })

        },

        addNewNote(note) {
            console.log('hi jessie')
            noteService.addNote(note)
                .then((note) => {
                    this.notes.unshift(note)
                })
        },
        filterNote(filterBy) {
            this.filterBy = filterBy
        }
    },

    computed: {
        notesToDisplay() {
            // if (!this.filterBy) return this.notes

            const { type, title } = this.filterBy

            const regex = new RegExp(title, "i")
            let notes = this.notes
                // if(noteType&&title)
            if (!type) {
                notes = notes.filter(note => regex.test(note.title))
            } else {

                notes = notes.filter(note => regex.test(note.title) && note.type === type)
            }
            // console.log('notes', notes)
            let pinnedNotes = notes.filter(note => note.isPinned)
            let notPinnedNotes = notes.filter(note => !note.isPinned)

            console.log(pinnedNotes.concat(notPinnedNotes))
            return pinnedNotes.concat(notPinnedNotes)
        }
    },
};