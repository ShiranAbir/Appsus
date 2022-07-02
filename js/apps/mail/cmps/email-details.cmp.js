import { noteService } from "../../keep/services/note-service.js"
import { emailService } from "../services/email-services.js"

export default {
    props: ["emailId"],
    template: `
      <section class="read-email" v-if="email">
            <li>
                <p class="details-subject">{{email.subject}}</p>
                <p class="details-from">{{email.from}} <span class="details-from-email">&lt;{{email.fromEmail}}&gt;</span></p>          
                <p class="details-date">{{formatSentDate(email.sentAt)}}</p>       
                <p class="details-body">{{email.body}}</p>
                <button class="save-email-note-btn" @click="saveToKeep">Save as Note</button>
            </li>
      </section>
  `,
    data() {
        return {
            email: null,
        }
    },
    methods: {
        getEmail() {
            emailService.getEmailById(this.emailId)
            .then((email) => {
                return emailService.modifyEmail(email.id,'isRead',true)
            })
            .then((email) => {
                this.email = email
            })
            .catch((error) => {
                this.$router.push('/email')
            })
        },
        formatSentDate(sentAt){
            const date = new Date(sentAt)
            const diff = new Date() - date
            const diffDays = Math.ceil(diff / (1000 * 60 * 60 * 24))

            var formattedDate = date.toLocaleString("en-US", {weekday: "short"})
            formattedDate += ', '
            formattedDate += date.toLocaleString("en-US", {month: "short", day:"numeric"})
            formattedDate += ', '
            if (diffDays >= 365) {
                formattedDate += `${date.toLocaleString("en-US", {year: "numeric"})}, `
            }
            formattedDate += date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

            if (diffDays >= 1 && diffDays < 7) {
                formattedDate += ` (${diffDays} days ago)`
            }
            
            return formattedDate
        },
        saveToKeep() {
            var note = noteService.getEmptyTextNote()

            note.title = this.email.subject
            note.info.txt = this.email.body

            noteService.addNote(note)
            this.$router.push('/keep')
        },
    },
    computed: {
        
    },
    created() {
        this.getEmail()
    },
}