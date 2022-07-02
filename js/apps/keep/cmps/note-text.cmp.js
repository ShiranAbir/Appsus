export default {
    template: `
          <section>
          
            <div>
            <h1 class="note-title">{{note.title}}</h1>

            <div :style="readStyle">

                {{note.info.txt}}
            </div>

            </div>
               
           
          </section>
          `,
    props: ["note"],
    data() {
        return {

        }
    },
    methods: {

    },
    computed: {
        readStyle() {
            return {
                // 'text-decoration': ? 'line-through' : 'none',
                width: '150px',
                'margin-left': '20px',
                // 'word-wrap': 'break-word',
                // 'overflow-wrap': 'break-word',



            }
        }

    },
    created() {
        console.log('infoooo:')
    },
}