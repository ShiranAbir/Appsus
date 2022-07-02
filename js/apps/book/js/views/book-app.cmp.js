import { bookService } from "../services/book-service.js";

import bookList from "../cmps/book-list.cmp.js";
// import bookDetails from "./book-details.cmp.js";
import bookFilter from "../cmps/book-filter.cmp.js";
import bookAdd from "../cmps/book-add.cmp.js";



export default {
    template: `
    <section class="book-app" >
   
        <book-filter v-if="books" @filtered="filterBook" :books="books"/>
        
        <book-add @addBook="updateBooks"/>
        
        <book-list :books="booksToDisplay" @selected="selectBook"/>
        
        <!-- //הבוקס בגרשיים זב הבוקס מהדטה -->

        
       
    <div class="keep-footer">
            <p>Created and designed by Shiran Abir & Adi Birenshtock © 2022</p>
        </div>
    
    </section>
    
  `,
    components: {
        bookList,
        bookFilter,
        bookAdd,
    },
    data() {
        return {
            books: null,
            selectedBook: null,
            filterBy: null,

        };
    },
    created() {
        // this.books = bookService.query()
        bookService.query().then(books => {
                this.books = books
                console.log('books', this.books)
            }) //the 'the' is done here so i can do the השמה here


    },
    methods: {
        // selectBook(book) {
        //     this.selectedBook = book
        // },
        filterBook(filterBy) { //את הפרמטר קיבלתי מהילד
            this.filterBy = filterBy //משנים את הפילטר ביי שבדטה
            console.log('this.filterBy:', this.filterBy)
        },
        updateBooks(books) {
            this.books = books


        }
    },
    computed: {
        booksToDisplay() {
            if (!this.filterBy) return this.books

            const { title, price } = this.filterBy
            const regex = new RegExp(title, "i")
            return this.books.filter(book => regex.test(book.title) && book.listPrice.amount <= price)
                // return this.books.filter(book => regex.test(book.title)).filter(book => book.))
        }


    },
};