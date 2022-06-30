import { noteService } from "../services/note-service.js";

import noteList from "../cmps/note-list.cmp.js";
import addNote from "../cmps/add-note.cmp.js";
import noteFilter from "../cmps/note-filter.cmp.js";

export default {
    template: `
    <note-filter @filtered="filterNote"  :notes="notes"/>
    <add-note @addNewNote="addNewNote" />
    <section class="keep-app" >
   
    <note-list :notes="notesToDisplay" @remove="removeNote" @pinNote="pinNote" @changeBGC="changeBGC"/>

    </section>
  `,
    components: {
        noteList,
        addNote,
        noteFilter,
    },
    data() {
        return {
            notes: null,
            filterBy: null,

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
        pinNote(note) {
            noteService.pinNote(note)
                .then(() => {
                    const idx = this.notes.findIndex((note) => note.id === note.id);
                    this.notes[idx].isPinned = !this.notes[idx].isPinned
                })


        },
        changeBGC(note, newBGC) {
            noteService.editNoteBGColor(note, newBGC).then(() => {
                        const idx = this.notes.findIndex((note) => note.id === id);
                        this.notes[idx].bGC = newBGC
                    }


                )
                // noteService.removeNote(id)
                // .then(() => {
                //     const idx = this.notes.findIndex((note) => note.id === id);
                //     this.notes.splice(idx, 1);
                // })


        },
        addNewNote(note) {
            console.log('hi jessie')
            noteService.addNote(note)
                .then((note) => {
                    this.notes.unshift(note)
                })
        },
        filterNote(filterBy) {
            // console.log('jjjjjjjj')
            this.filterBy = filterBy
        }
    },
    computed: {
        notesToDisplay() {
            if (!this.filterBy) return this.notes

            const { type, title } = this.filterBy

            const regex = new RegExp(title, "i")
                // if(noteType&&title)
            if (!type) {
                return this.notes.filter(note => regex.test(note.title))
            } else {

                return this.notes.filter(note => regex.test(note.title) &&
                    note.type === type)
            }
        }
    },
};