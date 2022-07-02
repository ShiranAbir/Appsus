import emailList from "./email-list.cmp.js"
import emailHeader from "../cmps/email-header.cmp.js"
import { utilService } from "../../../services/util-service.js"
import { emailService } from "../services/email-services.js"
import emailCreate from "./email-create.cmp.js"
import sideNav from "./side-nav.cmp.js"
import subNav from "./sub-nav.cmp.js"

export default {
    props: ["email", "folder"],
    template: `
      <section>
        <email-header @toggleModal="toggleModal" @searched="filterByKey"/>
        <sub-nav @filtered="filterByRead" @sortByDate="sortByDate"></sub-nav>
        <email-list ref="emailList" @decrementUnread="decrementUnread" @toggleIsRead="toggleIsRead" @deleteEmail="deleteEmail" @changeFolder="changeFolder" :emails="this.emails"/>
        <email-create @closeNewEmail="closeModal" v-if="newEmailCreate"></email-create>
        <side-nav ref="sideNav" @changeFolder="changeFolder" @openNewEmail="openModal"></side-nav>
      </section>
  `,
    data() {
        return {
            emails: utilService.gEmails,
            criteria: {
                status: 'inbox',
                txt: null,
                sortBy:'date',
                sortOrderAscending: false,
            },
            newEmailCreate: false,
        }
    },
    methods: {
        filterByKey(val) {
            this.criteria.txt = val
            emailService.query(this.criteria).then(emails => this.emails = emails)
          },
        filterByRead(val) {
            this.criteria.isRead = val
            emailService.query(this.criteria).then(emails => this.emails = emails)
          },
        changeFolder(folder){
            this.criteria.status = folder
            emailService.query(this.criteria).then(emails => {
                this.emails = emails
                this.$refs.emailList.unSelectEmail()  
            })
        },
        deleteEmail(id, isRead){
            if (this.criteria.status === 'trash'){
                 emailService.deleteEmail(id).then(() => {
                    return emailService.query(this.criteria)
                 }).then(emails => {
                    this.emails = emails
                 })
            }else{
                emailService.addToTrash(id).then(() => {
                    return emailService.query(this.criteria)
                 }).then(emails => {
                    if (this.criteria.status === 'inbox' && !isRead) this.$refs.sideNav.changeUnreadCount(false)
                    this.emails = emails
                 })
            }
        },
        toggleModal(){
            this.$emit('toggleModal')
        },
        toggleIsRead(val){
            if (this.criteria.status !== 'inbox') return
            if (val) {
                this.$refs.sideNav.changeUnreadCount(true)
            } else {
                this.$refs.sideNav.changeUnreadCount(false)
            }
        },
        openModal(){
            this.newEmailCreate = true
        },
        closeModal(){
            this.newEmailCreate = false
        },
        decrementUnread() {
            this.$refs.sideNav.changeUnreadCount(false)
        },
        sortByDate(order){
            console.log(order)
            this.criteria.sortBy = 'date'
            this.criteria.sortOrderAscending = order
            emailService.query(this.criteria).then(emails => this.emails = emails)
        },

    },
    computed: {},
    components: {
        emailList,
        emailHeader,
        emailCreate,
        sideNav,
        subNav,
    },
    created() {
        emailService.query(this.criteria).then(emails => this.emails = emails)
      },
}