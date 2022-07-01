import {emailService} from "../services/email-services.js"
// import { noteService } from "../../keep/services/note-service.js"

export default {
    template: `
      <section v-if="email">
            <li>
                <p class="details-subject">{{email.subject}}</p>
                <p class="details-from">{{email.from}}</p>          
                <p class="details-date">{{formatSentDate(email.sentAt)}}</p>       
                <p class="details-body">{{email.body}}</p>
                <!-- <button @click="saveToKeep">Save as Note</button> -->
            </li>
      </section>
  `,
    data() {
        return {
            email: null,
            note:{
                title: null,
                info: null,
            }
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
        // saveToKeep(){
        //     this.note
        //     noteService
        // },
    },
    computed: {
        
    },
    created() {
        this.getEmail()
    }
}