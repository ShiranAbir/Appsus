import { bookService } from '../services/book-service.js';


export default {
    // props: ["bookTitle"],
    template: `
    <section class="review-container">
    <h1>Add Review:</h1>
    <pre>{{userReview}}</pre>
    <form  @submit.prevent="addAndSave">
        <input placeholder="full name" type="text" v-model="userReview.fullName" required>

        <label for="stars">select stars</label>
        <select name="stars" id="stars" v-model="userReview.stars">
            <option value="5star">⭐⭐⭐⭐⭐</option>
            <option value="4star">⭐⭐⭐⭐</option>
            <option value="3star">⭐⭐⭐</option>
            <option value="2star">⭐⭐</option>
            <option value="1star">⭐</option>
        </select>

        <input v-model="userReview.readingDate" type="date" name="ReadingDate" id="ReadingDate" required/>

        <textarea v-model="userReview.bookReview" id="bookReview" name="bookReview" rows="4" cols="50" required></textarea>

        <button>save</button>
    </form>
    
    <section v-if="book" class="review-list">
        All reviews:
        <ul v-if="book.reviews">
            <li v-for="review in book.reviews">
                <button @click="remove(review.id)">X</button>
                <pre>{{userReview}}</pre>
            </li>
        </ul>
    </section>
 
     </section>
  `,
    data() {
        return {
            book: null,
            userReview: bookService.getEmptyReview()

        };
    },
    created() {
        const id = this.$route.params.bookId
        bookService.get(id)
            .then(book => {
                this.book = book
                console.log('my book', book)
            })

    },
    methods: {
        addAndSave() {
            // console.log('userReview', this.userReview)
            bookService.addReview(this.book.id, this.userReview).then(book => {
                this.book = book //שמה בבוק את הספר המעודכן
                this.userReview = bookService.getEmptyReview()
            })
        },
        remove(reviewId) {
            bookService.removeReview(this.book.id, reviewId)
                .then(book => { //בוק זה הספר המעודכן בלי הריוויו שמחקתי
                    this.book = book;
                    eventBus.emit('show-msg', { txt: `A review on book ${this.book.id} was successfully removed`, type: 'success' });
                })
        },
    }
}