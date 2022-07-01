import emailMainNav from "./email-main-nav.cmp.js"

export default {
  template: `
      <section class="page-header">
      <img class="main-logo" src="/css/apps/email/imgs/logo_gmail_lockup_default_2x_r2.png">
        <img class="main-login" src="/css/apps/email/imgs/unnamed.png">
        <header>
          <div class="search-container">
            <emailMainNav @filter="onFilterBystatus" @searched="onFilterByKeyWord" class="search-email"></emailMainNav>
          </div>
        </header>
      </section>
  `,
  components: {
    emailMainNav,
  },

  data() {
    return {}
  },
  methods: {
    onFilterByKeyWord(val) {
      this.$emit('searched', val)
    },
    onFilterBystatus(val) {
      this.$emit('filterd', val)
    }
  },
  computed: {

  },
}