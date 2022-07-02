import { emailService } from "../services/email-services.js";

export default {
    props: ["email"],
    template: `
      <section>
            <li :class="emailClass" >
                <p :class="isBold" class="from">{{email.from}}</p>
                <p :class="isBold" class="subject">{{email.subject}}</p>
                <p class="body">{{emailBodyTruncated}}</p>
                <p class="date">{{formatSentDate(email.sentAt)}}</p>
                <div @click.stop.prevent="removeEmail(email.id)" class="round-hover-list delete-email-btn"></div>
                <div @click.stop.prevent="toggleIsRead(email.id)" class="round-hover-list setread-email-btn"></div>
            </li>
      </section>
  `,
    data() {
        return {};
    },
    methods: {
        removeEmail(id){
            this.$emit('deleteEmail', id, this.email.isRead)
        },
        toggleIsRead(id){
            emailService.setAsRead(id).then(() => {
                this.email.isRead = !this.email.isRead
                this.$emit('toggleIsRead', !this.email.isRead)
            })
        },
        formatSentDate(sentAt){
            const date = new Date(sentAt)
            const now = new Date()

            // Same day, show only time
            if (date.toDateString() === now.toDateString()) {
                return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            }
            // Same year, show only month and day
            if(date.getFullYear() === now.getFullYear()){
                return date.toLocaleString("en-US", {month: "short", day:"numeric"})
            }
            // Use UK here because of dd/mm/yyyy instead of US mm/dd/yyyy
            return date.toLocaleDateString("en-UK")
        },
    },
    computed: {
        emailClass(){
            return (this.email.isRead) ? 'grey' : ''
        },
        isBold(){
            return (!this.email.isRead) ? 'bold-unread' : ''
        },
        emailBodyTruncated(){
            const body = this.email.body;
            const size = 80

            if (!body) return ''

            if (body.length <= size) {
                return body
            }
            return body.substr(0, size) + '...'
        },
    },
}