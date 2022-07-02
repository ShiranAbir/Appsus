export default {
    props: ['books'],
    template: `
    <section class="book-filter">
        <header>
        <router-link to="/emailApp">
                <button>Email</button>
            </router-link>
        </header>

        </router-link>
            <router-link to="/">
                <button >Home</button>
            </router-link>

            <router-link to="/keep">
                <button >Keep</button>
            </router-link>





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