export default {
  template: `
      <section class="side-nav">
        <nav>
          <div class="create-email-btn-container">
            <div @click="openNew" class="create-email-btn"></div>
          </div>
          <div @click="changeFolder('inbox')" class="inbox-btn"></div>
          <div @click="changeFolder('sent')" class="sent-btn"></div>
          <div @click="changeFolder('trash')" class="trash-btn"></div>
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