console.log('hii')
import { router } from "./router.js"


const options = {
    template: `
          <section>
          <!-- <router-link to="'/keepApp">MissKeep</router-link> -->
          <!-- <router-link to="'/emailApp">MisterEmail</router-link> -->
              <router-view/>
            
          </section>
      `,
    components: {

    },
}





const app = Vue.createApp(options);
app.use(router)
app.mount("#app");