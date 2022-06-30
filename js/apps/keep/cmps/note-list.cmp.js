import { noteService } from "../services/note-service.js";

import notePreview from "./note-preview.cmp.js";
import noteTxt from "./note-text.cmp.js";
import noteImg from "./note-img.cmp.js";
import noteVid from "./note-vid.cmp.js";
import noteTodos from "./note-todos.cmp.js";


export default {
    template: `
        
    <section class="note-list-container">


         <div class="note-container" :style="readStyle" v-for="note in notes">
         <component :is="note.type"
         :info="note.info"> 
          

         </component> 
         <div class="edit-btn-container">
         <button ><i class="fa-solid fa-thumbtack"></i></button>

            <div class="color-input-container">
                <input class="color-input" type="color" v-model="bGColor">
                <i class="fa-solid fa-palette"></i>

            </div>

            <button><i class="fa-solid fa-envelope"></i></button>

            <button><i class="fa-solid fa-pen-to-square"></i></button>

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
    },
    data() {
        return {
            notes: this.notes,
            bGColor: null,

        };
    },
    computed: {
        readStyle() {
            return {
                'background-color': this.bGColor || 'white',
                width: '200px',
                margin: '10px',
            }
        }
    },
    methods: {
        remove(id) {
            this.$emit('remove', id)
        }
    },
    created() {},
    watch: {}

};