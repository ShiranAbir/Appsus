import navBar from "../cmps/keep-nav.cmp.js";


export default {
    props: ['notes'],
    template: `

    <header class="header">
        <div class="burger-logo-keep-container">

            <div class="burger" @click="openNav">
            <i class="fa-solid fa-bars"></i>
            </div>
            <img class="logo" src="https://www.apkmirror.com/wp-content/uploads/2022/06/92/62b4a635a72fe.png" alt="">
    
            <div class="keep-logo">Keep</div>

        </div>



        <section class="note-filter-container">
            
            <div class="filter-text-container">
                
                <p><i class="fa-solid fa-magnifying-glass"></i></p>

            <input type="text" v-model="filterBy.title" @input="filter" placeholder="Search..." class="search-input-note"> 
           
    
        </div>
    
            <select  v-model="filterBy.type" @change="filter" class="select-input">
                <option value="">All</option>
                <option value="note-txt">Text</option>
                <option value="note-img">Img</option>
                <option value="note-vid">Video</option>
                <option value="note-todos">Todo List</option>
                <option value="note-audio">Audio</option>
            </select> 
          
        </section>
       
    </header>
    <nav-bar v-if="isNavClicked"/>

  `,
    data() {
        return {
            filterBy: {
                type: "",
                title: "",
            },
            isNavClicked: false,
        };
    },
    components: {

        navBar,
    },
    created() {

    },
    methods: {
        openNav() {
            this.isNavClicked = !this.isNavClicked
        },
        filter() {
            console.log('this.filterBy', this.filterBy)
            this.$emit("filtered", this.filterBy)
        }
    },
    computed: {

    },

}