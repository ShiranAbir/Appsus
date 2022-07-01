import { noteService } from "../services/note-service.js";

import notePreview from "./note-preview.cmp.js";
import noteTxt from "./note-text.cmp.js";
import noteImg from "./note-img.cmp.js";
import noteVid from "./note-vid.cmp.js";
import noteTodos from "./note-todos.cmp.js";
import noteAudio from "./note-audio.cmp.js";


export default {
    template: `
        
    <section class="note-list-container">


         <div class="note-container" :style="readStyle" v-for="note in notes">
         <component :is="note.type"
         :note="note" :style="{'background-color':note.bGC}" > 
          

         </component> 
         <div class="edit-btn-container">


         <button @click="pinNote(note.id)" ><i class="fa-solid fa-thumbtack"></i></button>

            <div class="color-input-container">

                <input class="color-input" type="color" @input="changeBGC(note)" v-model="colorInput">
                <i class="fa-solid fa-palette"></i>

            </div>

            <button @click="sendToMail(note.id)" ><i class="fa-solid fa-envelope"></i></button>

            <button @click="duplicateNote(note.id)"><i class="fa-solid fa-pen-to-square"></i></button>

            <button  @click="remove(note.id)"><i class="fa-solid fa-trash-can"></i></button>
            
           
        </div>
         </div>
        
        </section>
    
  `,
    props: ['notes'],
    components: {
        notePreview,
        noteTxt,
        noteImg,
        noteVid,
        noteTodos,
        noteAudio,
    },
    data() {
        return {
            notes: this.notes,
            colorInput: '#ffffff',

        };
    },
    computed: {
        readStyle() {
            return {
                width: '200px',
                margin: '10px',
            }
        },

    },
    methods: {
        remove(id) {
            this.$emit('remove', id)
        },
        changeBGC(note) {
            const newBGC = this.colorInput
            this.$emit('changeBGColor', note, newBGC)

        },
        pinNote(id) {
            this.$emit('pinNote', id)
        },
        duplicateNote(id) {
            this.$emit('duplicateNote', id)
        },
        sendToMail(id) {
            console.log('noteee')
            this.$emit('sendToMail', id)
        }

    }
}