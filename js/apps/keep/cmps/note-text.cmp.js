export default {
    template: `
          <section>
          
            <div>

                {{info.txt}}

            </div>
               
           
          </section>
          `,
    props: ["info"],
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