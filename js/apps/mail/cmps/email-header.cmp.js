import emailMainNav from "./email-main-nav.cmp.js"

export default {
    template: `
   <section>
          <div>
                  <h1 class="email-header">email</h1>
                  <emailMainNav @filter="onFilterBystatus" @searched="onFilterByKeyWord" class="search-email"></emailMainNav>
          </div>
      </section>
  `,
    components: {
      emailMainNav,
    },
  
    data() {
      return {}
    },
    methods: {
      onFilterByKeyWord(val){
        this.$emit('searched', val)
      },
      onFilterBystatus(val){
        this.$emit('filterd', val)
      }
    },
    computed: {
  
    },
  }