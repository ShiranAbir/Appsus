import { router } from "../../../router.js"

export default {
    template: `
            <section>
                <div>
                    <svg @click="closeModal" class="close-modal round-hover-clear" focusable="false" height="32px" viewBox="0 0 24 24" width="32px" xmlns="http://www.w3.org/2000/svg"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path><path d="M0 0h24v24H0z" fill="none"></path></svg>
                    <router-link to="/"><div class="round-hover-modal home-btn"></div></router-link>
                    <router-link to="keep"><div class="round-hover-modal missKeep-btn"></div></router-link>
                    <router-link to="books"><div class="round-hover-modal missBooks-btn"></div></router-link>
                 </div>
              </section>
    `,
    components: {
    },
  
    data() {
      return {}
    },
    methods: {
        closeModal(){
            this.$emit('closeModal')
        }

    },
    computed: {
  
    },
  }

