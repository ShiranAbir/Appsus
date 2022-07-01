export default {
  template: `
      <section class="side-nav">
        <nav>
          <div class="create-email-btn-container">
            <div @click="openNew" class="create-email-btn"></div>
          </div>
          <!-- <button @click="changeFolder('inbox')">Inbox</button> -->
          <div @click="changeFolder('sent')" class="sent-btn"></div>
          <!-- <button @click="changeFolder('trash')">Trash</button> -->
        </nav>
      </section>
  `,
  data() {
    return {};
  },
  methods: {
    openNew() {
      this.$emit('openNewEmail')
    },
    changeFolder(folder){
      this.$emit('changeFolder',folder)
    }
  },
  computed: {
  },
}