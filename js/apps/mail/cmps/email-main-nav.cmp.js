export default {
  template: `
   <section>
      <input class="search-input" @input="searchByKey($event)" type="text" placeholder="Search mail">
      <svg class="hamburger" focusable="false" viewBox="0 0 24 24"><path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"></path></svg>
      <svg @click="clearSearch" class="clear-search round-hover-clear" focusable="false" height="32px" viewBox="0 0 24 24" width="32px" xmlns="http://www.w3.org/2000/svg"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path><path d="M0 0h24v24H0z" fill="none"></path></svg>
      <svg class="start-search round-hover-clear" focusable="false" height="32px" viewBox="0 0 24 24" width="32px" xmlns="http://www.w3.org/2000/svg"><path d="M20.49,19l-5.73-5.73C15.53,12.2,16,10.91,16,9.5C16,5.91,13.09,3,9.5,3S3,5.91,3,9.5C3,13.09,5.91,16,9.5,16 c1.41,0,2.7-0.47,3.77-1.24L19,20.49L20.49,19z M5,9.5C5,7.01,7.01,5,9.5,5S14,7.01,14,9.5S11.99,14,9.5,14S5,11.99,5,9.5z"></path><path d="M0,0h24v24H0V0z" fill="none"></path></svg>
      <select class="filterEmails" @change="filterByStatus($event)">
          <option value="all">All</option>
          <option value=true>Read</option>
          <option value=false>Unread</option>
        </select>
    </section>
  `,
  components: {
    // search-input
  },

  data() {
    return {
      isSearchFocus: false,
    }
  },
  methods: {
    searchByKey(ev) {
      this.$emit('searched', ev.target.value)
    },
    filterByStatus(ev) {
      this.$emit('filter', ev.target.value)
    },
    clearSearch(){

    },
  },
  computed: {
  }
}