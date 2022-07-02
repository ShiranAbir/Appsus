import longText from "../cmps/long-text.cmp.js";
import reviewAdd from "../views/review-Add.cmp.js";
import { bookService } from "../services/book-service.js";


export default {
    // props: ["book"], 
    //אבא של דיטיילס הוא בוק-אפ
    template: `
    <section v-if="book" class="book-details">
        <h4>Book Details</h4>
        <h2 class="veteran-book" :class="displayVeteran">Veteran Book!</h2>
        <h2 class="new-book" :class="displayNew">New Book!</h2>
        <!-- <p>{{publishedDateMsg}}</p> -->
        <p>Title: {{book.title}}</p>
        <p>Subtitle: {{book.subtitle}}</p>
        <p>Author: <span v-for="author in book.authors">
            <h5>{{author}}</h5>
        </span></p>
        <!-- <p>Author: {{book.authors[0]}}</p> -->
        <!-- <p>Published Date: {{book.publishedDate}}</p> -->
        <!-- <p>Description: {{book.description}}</p> -->
        <long-text :text="book.description"></long-text>

        <p>Page Count: {{book.pageCount}}
            <span class="count-message">{{pageCountMessage}} </span>{
        </p>
        <!-- <p>Catagories: {{book.catagories[0]}} {{book.catagories[1]}}</p> -->
        <p>thumbnail: {{book.thumbnail}}</p>
        <p>Language: {{book.language}}</p>
        <p :class="turnPriceRed" :class="turnPriceGreen" >Price: {{book.listPrice.amount}} {{book.listPrice.currencyCode}}</p>
        <p>is On Sale: {{book.isOnSale}}</p>
        <img  v-bind:src="book.thumbnail" >
        <router-link class="closeDetails" to="/book">x</router-link>
        <button @click="isDisplayAddReview=!isDisplayAddReview" >Add Review</button>
        
        <router-link :to="'/book/' + nextBookId" >Next Book</router-link>
        <review-add :style="addStyle"></review-add>
    </section>

  `,
    data() {
        return {
            // book: this.book,
            // imgurl: book.thumbnail,
            book: null,
            isDisplayAddReview: false,
            nextBookId: null

        };
    },

    computed: {
        pageCountMessage() {
            const pageCount = this.book.pageCount
            if (pageCount > 500) return 'Long Reading'
            if (pageCount > 200) return 'Decent Reading'
            if (pageCount < 100) return 'Light Reading'
        },
        turnPriceRed() {
            return {
                red: (this.book.listPrice.amount > 150)
            }
        },
        turnPriceGreen() {
            return {
                green: (this.book.listPrice.amount < 20)
            }
        },
        displayVeteran() {
            return {
                display: ((new Date().getFullYear() - this.book.publishedDate) > 10)
            }
        },
        displayNew() {
            return {
                display: ((new Date().getFullYear() - this.book.publishedDate) < 1)
            }
        },
        addStyle() {
            return {
                display: this.isDisplayAddReview ? 'block' : 'none'
            }
        }
        // publishedDateMsg() {
        //     const publishedDate = this.selectedBook.publishedDate
        //     const currYear = new Date().getFullYear()
        //     const diff = currYear - currYear
        //     if (diff > 10) return 'Veteran Book!'
        //     if (diff < 1) return 'New Book!'
        // }
    },
    components: {
        longText,
        reviewAdd,
    },
    created() {
        console.log('kkkkk', this.$route)
            // const id = this.$route.params.bookId //get curr book id through route

        // bookService.get(id).then(book => {
        //         this.book = book
        //         console.log(book)
        //     })
        //לא צריך את הקוד הזה פה כי זה שכפול קוד, הimmetiade עושה את העבודה
        // this is how i get the specific book i pressed on
    },
    watch: {
        '$route.params.bookId': { //carId ritten this way in $route.params
            handler() {

                console.log('route changed')
                const id = this.$route.params.bookId
                    //get curr book id through route
                console.log('my id', id)

                bookService.get(id).then(book => {
                    this.book = book
                    console.log('my idddd', book.id)
                    bookService.getNextBookId(book.id)
                        .then(nextBookId => {
                            this.nextBookId = nextBookId
                            console.log('sss', this.nextBookId)
                        }) //מכניסים איידי קודם
                })
            },
            immediate: true
        },
    }
}