export default {
    template: `
          <section>
          
            <label class="input-container">
               <input type="text">
               <button class="input-btn"><i class="fa-solid fa-image"></i></button>
               <button class="input-btn"><i class="fa-solid fa-list"></i></button>
               <button class="input-btn"><i class="fa-solid fa-comment"></i></button>

              
            </label>  
          </section>
          `,
    props: ["info"],
    data() {
        return {
            val: ''
        }
    },
    methods: {


    },
    computed: {

    },
    created() {

    },
}