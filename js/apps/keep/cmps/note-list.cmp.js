import { noteService } from "../services/note-service.js";

import notePreview from "./note-preview.cmp.js";
import noteTxt from "./note-text.cmp.js";
import noteImg from "./note-img.cmp.js";
// import noteTodos from "./note-text.cmp.js";


export default {
    template: `
        <h1>All Notes</h1>
    <section class="note-list-container">


         <div :style="readStyle" v-for="note in notes">
         <component :is="note.type"
         :info="note.info"> 
          

         </component> 
         <div>
            <button  @click="remove(note.id)">delete</button>
            <input type="color" v-model="bGColor">
           
        </div>
         </div>
        


           
        </section>
    
  `,
    props: ['notes'],
    components: {
        notePreview,
        noteTxt,
        noteImg,
        // noteTodos,
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


        // remove(id) {

        // },


    },
    created() {
        // console.log('notesssss', this.notes)
    },
    watch: {
        // bGColor(setBGColor) {
        //     console.log('setBGColor', this.setBGColor)
        //     this.bGColor = setBGColor

        // }
    }

};