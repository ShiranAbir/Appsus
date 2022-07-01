import { emailService } from "../services/email-services.js";

export default {
    props: ["email"],
    template: `
      <section>
            <li :class="emailClass" >
                <p class="from">{{email.from}}</p>
                <p class="subject">{{email.subject}}</p>
                <p class="body">{{email.body}}</p>
                <div @click.prevent="removeEmail(email.id)" class="delete-email-btn"></div>
            </li>
      </section>
  `,
    data() {
        return {};
    },
    methods: {
        removeEmail(id){
            this.$emit('deleteEmail', id)
        }
    },
    computed: {
        emailClass(){
            return (this.email.isRead)? 'grey' : 'white'
        }
    },
}