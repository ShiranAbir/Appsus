export default {
    template: `
          <section>
          
            <div>
            <h1 class="note-title">{{note.title}}</h1>

                <img class="input-image" :src="note.info.txt" alt="">
                

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