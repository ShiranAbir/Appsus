import emailMainNav from "./email-main-nav.cmp.js"

export default {
  template: `
      <section class="page-header">
      <svg @click="toggleModal" class="hamburger" focusable="false" viewBox="0 0 24 24"><path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"></path></svg>
      <img class="main-logo" src="../../../../css/apps/email/imgs/logo_gmail_lockup_default_2x_r2.png">
        <img class="main-login" src="../../../../css/apps/email/imgs/unnamed.png">
        <header>
          <div class="search-container">
            <emailMainNav @searched="onFilterByKeyWord" class="search-email"></emailMainNav>
          </div>
        </header>
      </section>
  `,
  components: {
    emailMainNav,
  },

  data() {
    return {
    }
  },
  methods: {
    onFilterByKeyWord(val) {
      this.$emit('searched', val)
    },
    toggleModal(){
      this.$emit('toggleModal')
    }
  },
  computed: {

  },
}