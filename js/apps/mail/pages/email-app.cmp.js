import emailFolderList from "../cmps/email-folder-list.cmp.js"
import modal from "../cmps/modal.cmp.js"
import emailFooter from "../cmps/footer.cmp.js"

export default {
  template: `
    
    <email-folder-list @toggleModal="toggleModal" :folder="folder"/>
    <transition name="slide-fade">
      <modal @closeModal="closeModal" v-if="modal" class="modal"/>
    </transition>
    <email-footer></email-footer>
`,
  data() {
    return {
      folder: "inbox",
      modal: false,
    }
  },
  components: {
    emailFolderList,
    modal,
    emailFooter,
  },
  methods: {
    toggleModal() {
      this.modal = !this.modal
    },
    closeModal(){
      this.modal = false
    },
  },
  computed: {
  },
}
