import { emailService } from "../services/email-services.js"

export default {
    template: `
 <section class="email-compose">
        <form class="new-email-form">
            <div class="form-header">
            <div><span>New Message</span></div>
            <img @click="closeModal" class="close-btn" src="css/apps/email/imgs/cleardot.gif"/>
            <img class="maximize-btn" src="css/apps/email/imgs/cleardot.gif"/>
            <img class="minimize-btn" src="css/apps/email/imgs/cleardot.gif"/>
            </div>
            <div class="form-all-input">
                <input v-model="newEmail.to" class="form-input form-to" type="text" placeholder="To:" />
                <input v-model="newEmail.cc" class="form-input" type="text" placeholder="Cc:" />
                <input v-model="newEmail.bcc" class="form-input" type="text" placeholder="Bcc:" />
                <input v-model="newEmail.subject" class="form-input" type="text" placeholder="Subject:" />          
                <textarea v-model="newEmail.body" class="form-input" rows="22"></textarea>
            </div>  

            <div class="form-btns">
                <button @click="sendEmail" class="send-btn">Send</button>
                <div class="delete-btn"></div>
            </div>
        </form>
    </section>
  `,
    data() {
        return {
            newEmail:{
                from: 'Me',
                to: null,
                cc: null,
                bcc: null,
                subject: null,
                body: null,
            }
        }
    },
    methods: {
        closeModal(){
            this.$emit('closeNewEmail')  
        },
        sendEmail(){
            if (!this.newEmail.to) return alert('Please specify at least one recipient.')
            if (!this.newEmail.subject&&!this.newEmail.body) {
                if (confirm('Send this message without a subject or text in the body?')) {
                    emailService.addEmail(this.newEmail)
                    .then(mail => {
                        console.log('add')
                        console.log(mail)
                        this.closeModal()
                    })
                    this.$emit('emailSent',this.newEmail)
                }
            }
            this.$emit('emailSent',this.newEmail)
            emailService.addEmail(this.newEmail)
            .then(mail => {
                console.log('add')
                console.log(mail)
                this.closeModal()
            })
        },
        add() {
            bookService.addReview(this.book.id, this.review)
                .then(book => {
                    this.book = book;
                    this.review = bookService.getEmptyReview()
                    eventBus.emit('show-msg', { txt: `A review on book ${this.book.id} was successfully added`, type: 'success' });
                })
        },
        
    },
    computed: {

    },
}