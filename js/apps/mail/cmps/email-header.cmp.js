import emailMainNav from "./email-main-nav.cmp.js"

export default {
    template: `
   <section>
          <div>
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