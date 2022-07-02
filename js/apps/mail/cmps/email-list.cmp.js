import emailPreview from "./email-preview.cmp.js"
import { emailService } from "../services/email-services.js"
import emailCreate from "./email-create.cmp.js"
import sideNav from "./side-nav.cmp.js"
import emailDetails from "./email-details.cmp.js"


export default {
    props: ["emails"],
    template: `
    <section class="email-list">

        <email-details v-if="selectedEmail" :emailId="selectedEmail.id"></email-details>
        <div v-if="!selectedEmail" class="email" @click="emailSelected(email)" v-for="(email,id) in emails" :key="email.id">
            <email-preview @toggleIsRead="toggleIsRead" @deleteEmail="deleteEmail" :email="email" :key="email.id"/>
        </div>
    </section>
`,
    components: {
        emailPreview,
        emailCreate,
        sideNav,
        emailDetails,
    },

    data() {
        return {
            selectedEmail: null,
        }
    },
    methods: {
        emailSelected(email) {
            if (!this.selectedEmail) {
                this.selectedEmail = email
                if (!this.selectedEmail.isRead) this.$emit('decrementUnread')
                this.selectedEmail.isRead = true                
            } else if (this.selectedEmail.id === email.id) {
                this.selectedEmail = null
                return
            }
        },
        deleteEmail(id, isRead){
            this.$emit('deleteEmail',id, isRead)
        },
        toggleIsRead(val){
            this.$emit('toggleIsRead',val)
            
        },
        unSelectEmail(){
            this.selectedEmail = null
        }
    },
    computed: {
    },
}