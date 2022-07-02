export default {
    template: `
    <section class="sub-nav">
    <select class="filterEmails" @change="filterByStatus($event)">
          <option value="all">Read/Unread</option>
          <option value=true>Read</option>
          <option value=false>Unread</option>
    </select>
    <button @click="sortByDate" class="sortByDate">Date {{getSortDateArrow()}}</button>
    <button @click="sortBySubject" class="sortBySubject">Subject {{getSortSubjectArrow()}}</button>
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
        getSortDateArrow() {
            if (this.sortedByDate) {
                if (this.sortOrderAscending) return '↑'
                return '↓'
            }
            return '  '
        },
        getSortSubjectArrow() {
            if (this.sortedBySubject) {
                if (this.sortOrderAscending) return '↑'
                return '↓'
            }
            return '  '
        },
        filterByStatus(ev) {
            this.$emit('filtered', ev.target.value)
        },
        sortByDate(){
            var flagWasSorted = false
            if (this.sortedByDate) flagWasSorted = true

            this.sortedBySubject = false
            this.sortedByDate = true
            this.sortOrderAscending = !this.sortOrderAscending
            if (!flagWasSorted) this.sortOrderAscending = false

            this.$emit('sortByDate',this.sortOrderAscending)
        },
        sortBySubject(){
            var flagWasSorted = false
            if (this.sortedBySubject) flagWasSorted = true

            this.sortedByDate = false
            this.sortedBySubject = true
            this.sortOrderAscending = !this.sortOrderAscending
            if (!flagWasSorted) this.sortOrderAscending = false

            this.$emit('sortBySubject',this.sortOrderAscending)
        },

    },
    computed: {
    },
}