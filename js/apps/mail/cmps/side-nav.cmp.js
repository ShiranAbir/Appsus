import { emailService } from "../services/email-services.js"

export default {
  template: `
      <section class="side-nav">
        <nav>
          <div class="create-email-btn-container">
            <div @click="openNew" class="create-email-btn"></div>
          </div>
          <div :class="selectedInboxClassContainer">
            <div v-if="unReadEmails > 0" class="unread-emails" >{{unReadEmails}}</div>
            <div @click="changeFolder('inbox')" class="inbox-btn" :class="isInboxSelected"></div>
          </div>
          <div class="round" :class="selectedSentClassContainer">
            <div @click="changeFolder('sent')" class="sent-btn"></div>
          </div>
          <div class="round" :class="selectedTrashClassContainer">
            <div @click="changeFolder('trash')" class="trash-btn"></div>
          </div>
        </nav>
      </section>
  `,
  data() {
    return {
      selectedFolder: 'inbox',
      unReadEmails: 0,
    };
  },
  methods: {
    openNew() {
      this.$emit('openNewEmail')
    },
    changeFolder(folder){
      this.selectedFolder = folder
      this.$emit('changeFolder',folder)
    },
    setUnreadCount(){
      const criteria = {
        status: this.selectedFolder
      }
      emailService.countUnreadEmails(criteria).then(count => {
        this.unReadEmails = count
      })
    },
    changeUnreadCount(val){
      val ? this.unReadEmails += 1 : this.unReadEmails -= 1
    },
  },
  computed: {
    isInboxSelected(){
      return this.selectedFolder === 'inbox' ? 'inbox-btn-selected' : ''
    },
    selectedInboxClassContainer(){
      if (this.selectedFolder === 'inbox'){
        return 'inbox-selected'
      }
      return 'folder-not-selected round-hover'
    },
    selectedSentClassContainer(){
      if (this.selectedFolder === 'sent'){
        return 'folder-selected'
      }
      return 'folder-not-selected round-hover'
    },selectedTrashClassContainer(){
      if (this.selectedFolder === 'trash'){
        return 'folder-selected'
      }
      return 'folder-not-selected round-hover'
    }
  },
  created() {
    this.setUnreadCount()
  }
}