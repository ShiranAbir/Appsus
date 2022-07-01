export default {
    template: `
          <section>
          
            <div>
            <h1 class="title">{{note.title}}</h1>

                <iframe width="200" height="126" :src="note.info.vidUrl">
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