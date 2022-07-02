import bookPreview from "./book-preview.cmp.js";


export default {
    template: `
    <section class="book-list">

            <ul>
                <li v-for=" book in books" :key="book.id" class="book-preview-container">
                   <book-preview :book="book"/>
                  
                    <!-- <button class="btn-details" @click="selected(book)">Details</button> -->
                    <router-link :to="'/book/'+book.id">Details</router-link>
                    
                  
                </li>
            </ul>
        </section>
    
  `,
    props: ['books'],
    components: {
        bookPreview

    },
    data() {
        return {
            books: this.books

        };
    },
    methods: {
        // selected(book) {
        //     this.$emit("selected", book)
        // }

    },
};