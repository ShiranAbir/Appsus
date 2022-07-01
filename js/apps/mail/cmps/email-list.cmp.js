import emailPreview from "./email-preview.cmp.js"
import { emailService } from "../services/email-services.js"
import emailCreate from "./email-create.cmp.js"
import sideNav from "./side-nav.cmp.js"

export default {
    props: ["emails"],
    template: `
    <section class="email-list">
        <div class="email" @click="emailSelected(email)" v-for="(email,id) in emails" :key="email.id">
            <router-link tag="button" :to="'/email/'+email.id">
                <email-preview @toggleIsRead="toggleIsRead" @deleteEmail="deleteEmail" :email="email" :key="email.id"/>
            </router-link>
        </div>
        <email-create @closeNewEmail="closeModal" v-if="newEmailCreate"></email-create>
        <side-nav ref="sideNav" @changeFolder="changeFolder" @openNewEmail="openModal"></side-nav>
    </section>
`,
    components: {
        emailPreview,
        emailCreate,
        sideNav,
    },

    data() {
        return {
            selectedEmail: null,
            newEmailCreate: false,
        }
    },
    methods: {
        openModal(){
            this.newEmailCreate = true
        },
        closeModal(){
            this.newEmailCreate = false
        },
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
        },
        changeFolder(folder){
            this.$emit('changeFolder',folder)
        },
        deleteEmail(id){
            this.$emit('deleteEmail',id)
        },
        toggleIsRead(val){
            if (val) {
                this.$refs.sideNav.changeUnreadCount(true)
            } else {
                this.$refs.sideNav.changeUnreadCount(false)
            }
            
        },
    },
    computed: {
    },
}