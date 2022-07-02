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
        <p class="about-title">Our team</p>
        <section class="about">
            <div class="about-shiran">
            <p class="shiran-title">Shiran Abir<span onclick="window.open('https://linkedin.com/in/shiran-abir/', '_blank');" class="linkdin-icon"></span></p>
            
            </div>
            <div class="about-adi">
            <p class="adi-title">Adi Birenshtock<span onclick="window.open('https://linkedin.com/in/adi-birenshtock-4b889420a/', '_blank');" class="linkdin-icon"></span></p>
            </div>
        </section>
        <div class="main-page-footer">
            <p>Created and designed by Shiran Abir & Adi Birenshtock © 2022</p>
        </div>
    </section>
   
    `
}