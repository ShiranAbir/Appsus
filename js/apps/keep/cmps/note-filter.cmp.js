export default {
    props: ['notes'],
    template: `
    <section class="note-filter-container">
      
    <div class="filter-text-container">
        <input type="text" v-model="filterBy.title" @input="filter" placeholder="Search..." class="search-input"> 
        <p><i class="fa-solid fa-magnifying-glass"></i></p>

    </div>

        <select  v-model="filterBy.type" @change="filter" class="select-input">
            <option value="note-txt">Text</option>
            <option value="note-img">Img</option>
            <option value="note-vid">Video</option>
            <option value="note-todos">Todo List</option>
        </select> 
       

      
    </section>
  `,
    data() {
        return {
            filterBy: {
                type: "",
                title: "",
            },
        };
    },
    created() {

    },
    methods: {
        filter() {
            console.log('this.filterBy', this.filterBy)
            this.$emit("filtered", this.filterBy)
        }
    },
    computed: {

    },

}