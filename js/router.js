import misterEmail from "./pages/misterEmail-app.cmp.js"
import missKeep from "./pages/missKeep-app.cmp.js"

const routes = [{
        path: '/missKeep',
        component: missKeep
    },
    {
        path: '/misterEmail',
        component: misterEmail
    },

]


export const router = VueRouter.createRouter({
    routes,
    history: VueRouter.createWebHashHistory()
})