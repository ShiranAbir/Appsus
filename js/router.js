const routes = [{
        path: '/',
        component: homePage
    },
    {
        path: '/about',
        component: aboutPage
    },
    {
        path: '/missKeep',
        component: aboutPage
    },
    {
        path: '/misterEmail',
        component: aboutPage
    },

]


export const router = VueRouter.createRouter({
    routes,
    history: VueRouter.createWebHashHistory()
})