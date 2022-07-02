export default {
    template: `
     <img class="preview-img" :src="book.thumbnail" alt="">
     <h1>{{book.title}}</h1>
      <h5>{{book.listPrice.amount}} {{changeCurrency}}</h5>
    
  `,
    props: ['book'],
    components: {

    },
    data() {
        return {
            // book: this.book

        };
    },
    created() {


    },
    computed: {
        changeCurrency() {
            if (this.book.listPrice.currencyCode === `USD`) return `$`
            else if (this.book.listPrice.currencyCode === `ILS`) return `₪`
            else return `€`
        }


    },
};