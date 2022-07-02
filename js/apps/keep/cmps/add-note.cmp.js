import { noteService } from "../services/note-service.js"

export default {
    template: `
          <section>
           
          
            <form class="input-form" >
                
                <input type="text" :placeholder="textInputPlaceholder" name="title" v-model="title" class="title-input" @click="expandInput">
                
                
                <label class="input-btn-container">

                <button  @click="addImgNote" ><i class="fa-solid fa-image"></i></button>

                   <button 
                   @click="addTodoNote"><i class="fa-solid fa-list"></i></button>

                  <button  @click="addTextNote" ><i class="fa-solid fa-comment"></i></button>

                 <button  @click="addVidNote"><i class="fa-solid fa-clapperboard"></i></button>

                 <button  @click="addAudioNote"><i class="fa-solid fa-music"></i></button>

                     </label>  

                <p>
                    <textarea v-if="isExpanded"  name="content"  placeholder="Take a note..."  v-model="content" cols="5" rows="3" ></textarea>
                </p>

                
            </form>

          </section>
          `,
    props: ["info"],
    data() {
        return {
            title: null,
            content: null,
            noteId: null,
            isExpanded: false,
            textInputPlaceholder: 'Take a Note...'
        }
    },
    methods: {
        expandInput() {
            this.isExpanded = true
            this.textInputPlaceholder = 'Title'
            console.log('this.isExpanded', this.isExpanded)
        },

        addAudioNote() {
            const note = noteService.getEmptyAudioNote()
            note.title = this.title
            note.info.url = this.content
            noteService.addNote(note)
            this.$emit('addNewNote', note)



            this.isExpanded = false
            this.textInputPlaceholder = 'Take a Note...'
            console.log('this.isExpanded', this.isExpanded)


        },
        addTextNote() {
            const note = noteService.getEmptyTextNote()
            note.title = this.title
            note.info.txt = this.content
            console.log(this.addTextNote)
            noteService.addNote(note)

            this.$emit('addNewNote', note)
            this.isExpanded = false
            this.textInputPlaceholder = 'Take a Note...'
        },
        addImgNote() {

            const note = noteService.getEmptyImgNote()
            note.title = this.title
            this.noteId = note.id
            note.info.url = this.content
            noteService.addNote(note)

            this.$emit('addNewNote', note)
            this.isExpanded = false
            this.textInputPlaceholder = 'Take a Note...'
        },
        addVidNote() {

            const note = noteService.getEmptyVidNote()
            note.title = this.title
            note.info.vidUrl = this.content
            noteService.addNote(note)

            this.$emit('addNewNote', note)
            this.isExpanded = false
            this.textInputPlaceholder = 'Take a Note...'
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
            this.isExpanded = false
            this.textInputPlaceholder = 'Take a Note...'


        }
    },

    computed: {

    },
    created() {

    },
}