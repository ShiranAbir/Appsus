export default {
    props: ["email"],
    template: `
      <section>
            <li :class="emailClass" >
                <p class="from">{{email.from}}</p>
                <p class="subject">{{email.subject}}</p>
                <p class="body">{{email.body}}</p>
            </li>
      </section>
  `,
    data() {
        return {};
    },
    methods: {},
    computed: {
        emailClass(){
            return (this.email.isRead)? 'grey' : 'white'
        }
    },
}