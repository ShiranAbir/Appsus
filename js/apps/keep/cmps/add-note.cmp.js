import { noteService } from "../services/note-service.js"

export default {
    template: `
          <section>
           
            <label class="input-container">
               <input type="text" v-model="input" placeholder="Take a note..." >

               <!-- <textarea v-model="input"  cols="30" rows="1"></textarea> -->

               <button class="input-btn" @click="addImgNote" ><i class="fa-solid fa-image"></i></button>

               <button class="input-btn"
               @click="addTodoNote"><i class="fa-solid fa-list"></i></button>

               <button class="input-btn" @click="addTextNote" ><i class="fa-solid fa-comment"></i></button>

               <button class="input-btn" @click="addVidNote"><i class="fa-solid fa-clapperboard"></i></button>

              
            </label>  
          </section>
          `,
    props: ["info"],
    data() {
        return {
            input: null,
            noteId: null
        }
    },
    methods: {
        // addNewNote() {
        //     this.$emit('addNewNote')
        // },
        addTextNote() {
            const note = noteService.getEmptyTextNote()
            note.info.txt = this.input
            console.log(this.addTextNote)
            noteService.addNote(note)

            this.$emit('addNewNote', note)
        },
        addImgNote() {
            const note = noteService.getEmptyImgNote()
            this.noteId = note.id
            note.info.url = this.input
            noteService.addNote(note)
        },
        addVidNote() {
            const note = noteService.getEmptyVidNote()
            note.info.vidUrl = this.input
            noteService.addNote(note)
        },
        addTodoNote() {
            const inputTodos = this.input.split(",")
            const getTodoObj = inputTodos.map(todo => {
                return { txt: todo, doneAt: null }
            })
            console.log(getTodoObj)
            const note = noteService.getEmptyTodoNote()
            note.info.todos = getTodoObj
            console.log('note', note)
            noteService.addNote(note)


        }
    },

    computed: {

    },
    created() {

    },
}