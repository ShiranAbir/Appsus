export default {
    template: `
          <section>
          <h1 class="note-title">{{note.title}}</h1>

          
            <div v-for="infoObj in note.info.todos"  >
                <span @click="changeIsDone" :style="readStyle"> {{infoObj.txt}} </span>
                <!-- @click="infoObj.isDone=!infoObj.isDone" -->
           
            </div >  
          </section>
          `,
    props: ["note"],
    data() {
        return {
            isDone: false,
        }
    },
    methods: {
        changeIsDone(infoObj) {
            infoObj.isDone = !infoObj.isDone
            console.log('infoObj', infoObj.isDone)
                // 'text-decoration': infoObj.isDone  ? 'line-through' : 'none',

        }


    },
    computed: {
        readStyle() {
            return {
                // 'text-decoration': ? 'line-through' : 'none',
                width: '150px',
                'margin-left': '20px',



            }
        }

    },
    created() {

    },
}