export default {
    template: `
    <section class="sub-nav">
    <select class="filterEmails" @change="filterByStatus($event)">
          <option value="all">Read/Unread</option>
          <option value=true>Read</option>
          <option value=false>Unread</option>
    </select>
    <button @click="sortByDate" class="sortByDate">Date {{getSortArrow()}}</button>
    </section>
`,
    components: {

    },

    data() {
        return {
            sortedByDate: true,
            sortedBySubject: false,
            sortOrderAscending: false,
        }
    },
    methods: {
        getSortArrow() {
            if (this.sortedByDate) {
                if (this.sortOrderAscending) return '↑'
                return '↓'
            }
            return '↓'
        },
        filterByStatus(ev) {
            this.$emit('filtered', ev.target.value)
        },
        sortByDate(){
            this.sortOrderAscending = !this.sortOrderAscending
            this.$emit('sortByDate',this.sortOrderAscending)
        }

    },
    computed: {
    },
}