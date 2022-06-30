export default {
    template: `
 <section class="email-compose">
        <form class="new-email-form">
            <div class="form-header">
            <div><span>New Message</span></div>
            <img @click="closeModal" class="close-btn" src="imgs/cleardot.gif"/>
            <img class="maximize-btn" src="imgs/cleardot.gif"/>
            <img class="minimize-btn" src="imgs/cleardot.gif"/>
            </div>
            <div class="form-all-input">
                <input class="form-input form-to" type="text" placeholder="To:" />
                <input class="form-input" type="text" placeholder="Cc:" />
                <input class="form-input" type="text" placeholder="Bcc:" />
                <input class="form-input" type="text" placeholder="Subject:" />          
                <textarea class="form-input" rows="22"></textarea>
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
            console.log('hi')
            this.$emit('closeNewEmail')  
        },
        sendEmail(){
            if (!this.newEmail.to) return alert('Please specify at least one recipient.')
            if (!this.newEmail.subject&&!this.newEmail.body) {
                if (confirm('Send this message without a subject or text in the body?')) {
                    this.closeModal()
                    this.$emit('emailSent',this.newEmail)
                }
            }
            this.$emit('emailSent',this.newEmail)
            this.closeModal()
        }
    },
    computed: {

    },
}