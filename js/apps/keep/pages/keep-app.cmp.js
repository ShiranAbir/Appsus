import { noteService } from "../services/note-service.js";

import noteList from "../cmps/note-list.cmp.js";
import addNote from "../cmps/add-note.cmp.js";

export default {
    template: `
    <add-note @addNewNote="addNewNote" />
    <section class="keep-app" >
   
    <note-list :notes="notes" @remove="removeNote"/>

    </section>
  `,
    components: {
        noteList,
        addNote,
    },
    data() {
        return {
            notes: null,

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
        addNewNote(note) {
            console.log('hi jessie')
            noteService.addNote(note)
                .then((note) => {
                    this.notes.unshift(note)
                })

        }
    },
    computed: {},
};