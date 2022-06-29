import { router } from "./router"

export default {
  template: `
      <router-view/>
  `,
  data() {
    return {}
  },
  components: {},
  created() {},
  methods: {},
  computed: {},
}


const app = Vue.createApp(options);
app.use(router)
app.mount("#app");