export default {
    template: `
    
            <div class="keep-nav-bar">
           
            <router-link to="/emailApp">
                <button class="btn-mail-nav">Email</button>
            </router-link>

            <router-link to="/">
                <button class="btn-mail-nav">Home</button>
            </router-link>

            <router-link  to="/books" >
            <button class="btn-mail-nav">Books</button>


                 </router-link>
        </div>
          `,

    data() {
        return {

        }
    },
    methods: {


    },
    computed: {

    },
    created() {

    },
}