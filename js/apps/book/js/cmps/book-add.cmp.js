import { bookService } from "../services/book-service.js";
export default {

    template: `
  
   <input type="text" v-model="userInput" @change="searchBooks" placeholder="Search Book">

   <label for="selectBook">select book:</label>
   <div  v-if="books" >
    <p  v-for="book in books" class="option" >
    {{book.volumeInfo.title}}<button @click="addBook(book.volumeInfo)" class="option-btn">➕</button></p>
    </div>

  `,
    components: {

    },
    data() {
        return {
            userInput: null,
            books: null,



        };
    },
    created() {},
    methods: {
        searchBooks() {
            bookService.queryGoogleBooks(this.userInput)
                .then(books => {
                    console.log(books)
                    this.books = books
                })
        },
        addBook(bookInfo) {
            // console.log('',bookInfo)
            bookService.addGoogleBook(bookInfo)
                .then(book => {
                    bookService.query()
                        .then(books => {
                            console.log(books)
                            this.$emit('addBook', books)
                        })

                })
        }
    }
}