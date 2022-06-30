export default {
    template: `
          <section>
          
            <div>
                <!-- {{info.url}} -->
                <iframe width="200" height="126" :src="info.vidUrl">
               </iframe>
                

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