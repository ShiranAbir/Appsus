import emailList from "./email-list.cmp.js"
import emailHeader from "../cmps/email-header.cmp.js"
import { utilService } from "../../../services/util-service.js"
import { emailService } from "../services/email-services.js"

export default {
    props: ["email", "folder"],
    template: `
      <section>
        <email-header @filterd="filterByRead" @searched="filterByKey"/>
        <email-list :emails="this.emails"></email-list>
      </section>
  `,
    data() {
        return {
            emails: utilService.gEmails,
        };
    },
    methods: {
        filterByKey(val) {
            emailService.query().then(emails => {
              emails = emails.filter(email => {
                return email.subject.toLowerCase().includes(val.toLowerCase()) ||
                  email.from.toLowerCase().includes(val.toLowerCase()) ||
                  email.body.toLowerCase().includes(val.toLowerCase())
              })
              this.emails = emails
            })
          },
          filterByRead(val) {
            emailService.query().then(emails => {
              emails = emails.filter(email => {
                if (val === 'all') return true
                return email.isRead.toString() === val
              })
              this.emails = emails
            })
          }
    },
    computed: {},
    components: {
        emailList,
        emailHeader,
    },
    created() {
        emailService.query().then(emails => this.emails = emails)
        console.log(this.folder)
      },
}