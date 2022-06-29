import emailPreview from "./email-preview.cmp.js"
import { emailService } from "../services/email-services.js"
import emailCreate from "./email-create.cmp.js"

export default {
    props: ["emails"],
    template: `
    <section class="email-list">
        <h1>Unread emails: {{unReadEmails}}</h1>
        <div class="email" @click="emailSelected(email)" v-for="(email,id) in emails" :key="email.id">
            <router-link tag="button" :to="'/email/'+email.id">
                <email-preview :email="email" :key="email.id"/>
            </router-link>
        </div>
        <email-create></email-create>
    </section>
`,
    components: {
        emailPreview,
        emailCreate,
    },

    data() {
        return {
            selectedEmail: null,
            unReadEmails:0,
        }
    },
    methods: {
        emailSelected(email) {
            if (!this.selectedEmail) {
                this.selectedEmail = email
                this.selectedEmail.isRead = true
            } else if (this.selectedEmail.id === email.id) {
                this.selectedEmail = null
                return
            }
        },
        setUnreadCount(){
            emailService.countUnreadEmails().then(count => this.unReadEmails = count)
        }
    },
    computed: {
    },
    created() {
        this.setUnreadCount()
    }
}