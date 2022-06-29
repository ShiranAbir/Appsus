export default {
    template: `
 <section class="email-compose">
        <form>
            <div class="new-email-form">
            <h1>New Message</h1>
            <button class="close-btn">X</button>
            </div>
            <input required type="text" placeholder="To:" />
            <input type="text" placeholder="Cc:" />
            <input type="text" placeholder="Bcc:" />
            <input required type="text" placeholder="Subject:" />          
            <textarea rows="5"></textarea>

            <div class="form-btns">
                <button class="send-btn">Send</button>
                <button>Delete</button>
            </div>
        </form>
    </section>
  `,
    data() {
        return {
        }
    },
    methods: {},
    computed: {

    },
}