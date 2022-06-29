import homePage from "./pages/home-page.cmp.js"
import emailApp from "./apps/mail/pages/email-app.cmp.js"

const routes = [
    { path: '/', component: homePage },
    { path: '/email:filter?', component: emailApp },
    // { path: '/keep', component: keepApp },
]

export const router = VueRouter.createRouter({
    routes,
    history: VueRouter.createWebHashHistory()
})