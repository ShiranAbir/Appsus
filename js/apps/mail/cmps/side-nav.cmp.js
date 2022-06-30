export default {
    template: `
      <section class="side-nav">
        <nav>
          <div class="create-email-btn-container">
            <div @click="openNew" class="create-email-btn"></div>
          </div>
        </nav>
      </section>
  `,
    data() {
        return {};
    },
    methods: {
      openNew(){
        console.log('hi')
        this.$emit('openNewEmail')
      }
    },
    computed: {
    },
}