import {emailService} from "../services/email-services.js"

export default {
    template: `
      <section v-if="email">
            <li>
                <p class="from">{{email.from}}</p>
                <p class="subject">{{email.subject}}</p>
                <p class="body">{{email.body}}</p>
            </li>
      </section>
  `,
    data() {
        return {
            email: null
        }
    },
    methods: {
        getEmail() {
            const emailId = this.$route.params.emailId
            emailService.getEmailById(emailId)
            .then((email) => {
                return emailService.modifyEmail(email.id,'isRead',true)
            })
            .then((email) => {
                this.email = email
            })
            .catch((error) => {
                this.$router.push('/email')
            })
        }
    },
    computed: {

    },
    created() {
        this.getEmail()
    }
}