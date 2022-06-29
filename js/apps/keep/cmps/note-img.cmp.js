export default {
    template: `
          <section>
          
            <div>
                <!-- {{info.url}} -->
                <img class="input-image" :src="info.url" alt="">
                

            </div>
              
               
            </label>  
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