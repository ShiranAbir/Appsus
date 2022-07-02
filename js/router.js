import homePage from "./pages/home-page.cmp.js"
import emailApp from "./apps/mail/pages/email-app.cmp.js"
import keepApp from "./apps/keep/pages/keep-app.cmp.js"
import emailDetails from "./apps/mail/cmps/email-details.cmp.js"

import bookApp from "./apps/book/js/views/book-app.cmp.js"
import bookDetails from "./apps/book/js/views/book-details.cmp.js"


const routes = [
    { path: '/', component: homePage },
    { path: '/email:filter?', component: emailApp },
    { path: '/keep', component: keepApp },
    { path: '/email/:emailId', component: emailDetails },


    {
        path: '/books',
        component: bookApp
    },
    {
        path: '/book/:bookId',
        component: bookDetails
    },
]

export const router = VueRouter.createRouter({
    routes,
    history: VueRouter.createWebHashHistory()
})