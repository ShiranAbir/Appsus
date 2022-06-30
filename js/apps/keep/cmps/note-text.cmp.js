export default {
    template: `
          <section>
          
            <div>
            <h1 class="title">{{note.title}}</h1>
                {{note.info.txt}}

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