export default {
    template: `
   <section>
        <input @input="searchByKey($event)" type="text" placeholder="Search mail">
        <select @change="filterByStatus($event)">
            <option value="all">All</option>
            <option value=true>Read</option>
            <option value=false>Unread</option>
        </select>
    </section>
  `,
    components: {

    },
  
    data() {
      return {}
    },
    methods: {
        searchByKey(ev){
            this.$emit('searched', ev.target.value)
        },
        filterByStatus(ev){
            this.$emit('filter', ev.target.value)
        }
    },
    computed: {
  
    },
  }