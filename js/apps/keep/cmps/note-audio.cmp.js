export default {
    template: `
          <section>

            <div>
            <h1 class="note-title">{{note.title}}</h1>

            <!-- <audio src="note.info.url"></audio> -->
            <audio controls class="audio">
        <source :src="note.info.url" type="audio/ogg">
       
      Your browser does not support the audio element.
      </audio>
            </div>
            
          </section>
          `,
    props: ["note"],
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