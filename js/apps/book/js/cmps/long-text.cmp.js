export default {
    props: ['text'],
    template: `
    <p>{{formatedText}} <span :style="readStyle" @click="isMore=!isMore"  v-if="longText">{{readText}}</span></p>
  `,
    components: {

    },
    data() {
        return {
            longText: this.text.length > 100, //בוליאני
            isMore: false,
        };
    },
    created() {},
    computed: {
        formatedText() {
            return this.isMore ? this.text : this.text.slice(0, 100) + '...'
        },
        readText() {
            return this.isMore ? 'Read Less' : 'Read More'
        },
        readStyle() {
            return {
                color: this.isMore ? 'red' : 'blue',
                cursor: 'pointer',
                textDecoration: 'underline'

            }
        }
    },
};