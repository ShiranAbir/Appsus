import { utilService } from "../../../services/util-service.js"
import emailList from "../cmps/email-list.cmp.js"
// import bookDetails from "./book-details.cmp.js"
// import bookFilter from "../cmps/book-filter.cmp.js"
import {emailService} from "../services/email-services.js"
import emailHeader from "../cmps/email-header.cmp.js"


export default {
  props: ["email"],
  template: `
    <!-- <book-filter @filtered="filterBook"></book-filter> -->
    <email-header></email-header>
    <email-list :emails="emailsToShow"></email-list>
    <!-- <book-details></book-details> -->
`,
  data() {
    return {
        emails: utilService.gEmails,
        filterBy: {
        byName: null,
        fromPrice: null,
        toPrice: null
      },
    }
  },
  components: {
    emailList,
    emailHeader,
    // bookDetails,
    // bookFilter,
  },
  methods: {
    // filterBook(filterBy) {
    //   this.filterBy = filterBy;
    // },
  },
  computed: {
    emailsToShow() {
      var emails = this.emails
    //   if (this.filterBy.byName){
    //     books = books.filter(book => book.title.startsWith(this.filterBy.byName.toLowerCase()))
    //   }
    //   if (this.filterBy.fromPrice){
    //     books = books.filter(book => book.listPrice.amount > this.filterBy.fromPrice)
    //   }
    //   if (this.filterBy.toPrice){
    //     books = books.filter(book => book.listPrice.amount < this.filterBy.toPrice)
    //   }
      return emails
    },
  },
  created() {
    emailService.query().then(emails => this.emails = emails)
},
}
