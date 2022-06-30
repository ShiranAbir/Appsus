export default {
    template: `
          <section>
          
            <div v-for="infoObj in info.todos" @click="isDone=!isDone" :style="readStyle" >
                {{infoObj.txt}}
              
            </div >  
          </section>
          `,
    props: ["info"],
    data() {
        return {
            isDone: false,
        }
    },
    methods: {

    },
    computed: {
        readStyle() {
            return {
                'text-decoration': this.isDone ? 'line-through' : 'none',
                'text-align': 'left',
                width: '150px'



            }
        }

    },
    created() {

    },
}