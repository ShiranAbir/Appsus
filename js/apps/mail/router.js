import homePage from "./cmps/home-page.cmp.js"

const routes = [{
        path: '/',
        component: homePage,
    },

]


export const router = VueRouter.createRouter({
    routes,
    history: VueRouter.createWebHashHistory()
})