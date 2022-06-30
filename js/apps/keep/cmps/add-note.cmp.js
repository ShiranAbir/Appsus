import { noteService } from "../services/note-service.js"

export default {
    template: `
          <section>
           
          
            <form class="input-form" >
                <input type="text" placeholder="Title" name="title" v-model="title"> 
                <label class="input-container">

                <button class="input-btn" @click="addImgNote" ><i class="fa-solid fa-image"></i></button>

                   <button class="input-btn"
                   @click="addTodoNote"><i class="fa-solid fa-list"></i></button>

                  <button class="input-btn" @click="addTextNote" ><i class="fa-solid fa-comment"></i></button>

                 <button class="input-btn" @click="addVidNote"><i class="fa-solid fa-clapperboard"></i></button>

                     </label>  

                <p>
                    <textarea name="content"  placeholder="Take a note..."  v-model="content" cols="30" rows="3"></textarea>
                </p>

                




                
            </form>





          </section>
          `,
    props: ["info"],
    data() {
        return {
            title: null,
            content: null,
            noteId: null
        }
    },
    methods: {
        // addNewNote() {
        //     this.$emit('addNewNote')
        // },
        addTextNote() {
            note.title = this.title
            const note = noteService.getEmptyTextNote()
            note.info.txt = this.content
            console.log(this.addTextNote)
            noteService.addNote(note)

            this.$emit('addNewNote', note)
        },
        addImgNote() {
            note.title = this.title

            const note = noteService.getEmptyImgNote()
            this.noteId = note.id
            note.info.url = this.content
            noteService.addNote(note)

            this.$emit('addNewNote', note)
        },
        addVidNote() {
            note.title = this.title

            const note = noteService.getEmptyVidNote()
            note.info.vidUrl = this.content
            noteService.addNote(note)

            this.$emit('addNewNote', note)
        },
        addTodoNote() {
            note.title = this.title

            const contentTodos = this.content.split(",")
            const getTodoObj = contentTodos.map(todo => {
                    return { txt: todo, isDone: false }
                })
                // console.log(getTodoObj)
            const note = noteService.getEmptyTodoNote()
            note.info.todos = getTodoObj
                // console.log('note', note)
            noteService.addNote(note)

            this.$emit('addNewNote', note)


        }
    },

    computed: {

    },
    created() {

    },
}