export default {
    template: `
          <section>
          
            <div>
            <h1 class="note-title">{{note.title}}</h1>

                <iframe width="197" height="124" :src="note.info.txt">
               </iframe>
                

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

    },
    created() {
        console.log('infoooo:')
    },
}