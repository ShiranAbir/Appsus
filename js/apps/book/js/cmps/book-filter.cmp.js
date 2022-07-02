export default {
    props: ['books'],
    template: `
        <header class="book-header">

        <div class="logo-and-books-container">

            <img class="book-header-img-logo" src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Google_Play_Books_icon_%282016%29.svg/640px-Google_Play_Books_icon_%282016%29.svg.png" alt="">

            <div>Books</div>

        </div>

        <div class="book-header-btn-container">

            <router-link to="/emailApp">
                    <button class="book-header-btn">Email</button>
                </router-link>
                
            </router-link>
            <router-link to="/">
                <button class="book-header-btn" >Home</button>
            </router-link>
            
            <router-link to="/keep">
                <button class="book-header-btn" >Keep</button>
            </router-link>
        </div>
        
    </header>

    <section class="book-filter">




       <!-- <p class="">filter:</p> -->
        <input type="text" v-model="filterBy.title" @input="filter" placeholder="Search By Title...">
        <input type="range" v-model="filterBy.price" @input="filter" :min="minPrice" :max="maxPrice" v-model.number="filterBy.price">
        {{filterBy.price}}
    </section>
  `,
    data() {
        return {
            filterBy: {
                title: "",
                price: "",
            },

        };
    },
    created() {
        console.log(this.books)
        this.filterBy.price = this.minPrice
    },
    methods: {
        filter() {
            this.$emit("filtered", this.filterBy)
        }
    },
    computed: {
        minPrice() {
            if (!this.books) return 0
            return Math.min(...this.books.map((book) => book.listPrice.amount))

        },
        maxPrice() {
            return Math.max(...this.books.map((book) => book.listPrice.amount))
        },
    },

}