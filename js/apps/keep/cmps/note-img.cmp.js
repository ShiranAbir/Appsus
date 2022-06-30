export default {
    template: `
          <section>
          
            <div>
            <h1 class="title">{{note.title}}</h1>

                <img class="input-image" :src="note.info.url" alt="">
                

            </div>
              
               
            </label>  
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