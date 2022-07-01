import { noteService } from "../services/note-service.js"

export default {
    template: `
          <section>
           
          
            <form class="input-form" >
                <input type="text" placeholder="Title" name="title" v-model="title" class="title-input">
                
                
                <label class="input-btn-container">

                <button  @click="addImgNote" ><i class="fa-solid fa-image"></i></button>

                   <button 
                   @click="addTodoNote"><i class="fa-solid fa-list"></i></button>

                  <button  @click="addTextNote" ><i class="fa-solid fa-comment"></i></button>

                 <button  @click="addVidNote"><i class="fa-solid fa-clapperboard"></i></button>

                     </label>  

                <p>
                    <textarea name="content"  placeholder="Take a note..."  v-model="content" cols="5" rows="3"></textarea>
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
            const note = noteService.getEmptyTextNote()
            note.title = this.title
            note.info.txt = this.content
            console.log(this.addTextNote)
            noteService.addNote(note)

            this.$emit('addNewNote', note)
        },
        addImgNote() {

            const note = noteService.getEmptyImgNote()
            note.title = this.title
            this.noteId = note.id
            note.info.url = this.content
            noteService.addNote(note)

            this.$emit('addNewNote', note)
        },
        addVidNote() {

            const note = noteService.getEmptyVidNote()
            note.title = this.title
            note.info.vidUrl = this.content
            noteService.addNote(note)

            this.$emit('addNewNote', note)
        },
        addTodoNote() {
            const note = noteService.getEmptyTodoNote()
            note.title = this.title

            const contentTodos = this.content.split(",")

            const getTodoObj = contentTodos.map(todo => {
                return { txt: todo, isDone: false }
            })

            note.info.todos = getTodoObj

            // console.log(getTodoObj)
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