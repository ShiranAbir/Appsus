import emailList from "./email-list.cmp.js"
import emailHeader from "../cmps/email-header.cmp.js"
import { utilService } from "../../../services/util-service.js"
import { emailService } from "../services/email-services.js"

export default {
    props: ["email", "folder"],
    template: `
      <section>
        <email-header @filterd="filterByRead" @searched="filterByKey"/>
        <email-list @deleteEmail="deleteEmail" @changeFolder="changeFolder" :emails="this.emails"/>
      </section>
  `,
    data() {
        return {
            emails: utilService.gEmails,
            criteria: {
                status: 'inbox',
                txt: null,
            }
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
            emailService.query(this.criteria).then(emails => this.emails = emails)
        },
        deleteEmail(id){
            if (this.criteria.status === 'trash'){
                 emailService.deleteEmail(id)
            }else{
                console.log(id)
                emailService.addToTrash(id)
                location.reload()
            }
        },
    },
    computed: {},
    components: {
        emailList,
        emailHeader,
    },
    created() {
        emailService.query(this.criteria).then(emails => this.emails = emails)
      },
}