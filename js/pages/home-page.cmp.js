export default {
    template: `
    <section class="home-page">
        <section>
            <div>
                <h1>APPSUS</h1>
            </div>
        </section>
        <div>Appsus Apps</div>
        <section>
            <router-link to="/emailApp">
                <button>Email</button>
            </router-link>
            <!-- <router-link to="/missKeep">
                <button>Keep</button>
            </router-link> -->

            <router-link to="/book">
                <button>Books</button>
            </router-link>
        </section>
    </section>
    `
}