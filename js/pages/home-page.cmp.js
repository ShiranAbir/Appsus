import { router } from "../router.js"

export default {
    template: `
    <section class="home-page">
        <section>
            <header class="main-app-header">
            <img class="home-main-login" src="css/apps/email/imgs/unnamed.png">
                <img class="home-page-main-logo" src="css/apps/email/imgs/logo_gmail_lockup_default_2x_r2.png">
            </header>
        </section>
        <div class="sub-title">Our Features</div>
        <section class="features-container">
            <router-link class="home-email-btn" to="/emailApp" />
            <router-link class="home-keep-btn" to="/keep" />
            <router-link class="home-books-btn" to="/books" />
        </section>
        <p class="about-title">About our team</p>
        <section class="about">
            <div class="about-shiran"></div>
            <div class="about-adi"></div>
        </section>
        <div class="main-page-footer">
            <p>Created and designed by Shiran Abir & Adi Birenshtock © 2022</p>
        </div>
    </section>
   
    `
}