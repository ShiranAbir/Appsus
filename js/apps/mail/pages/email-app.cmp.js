import emailFolderList from "../cmps/email-folder-list.cmp.js"

export default {
  template: `
    <email-folder-list :folder="folder"/>
`,
  data() {
    return {
      folder: "inbox"
    }
  },
  components: {
    emailFolderList,
  },
  methods: {
    
  },
  computed: {
  },
}
