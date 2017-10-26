Vue.component('post-item', {
    props: ['list'],
    template: ` 
    <div class="col-lg-2 col-sm-3 col-xs-4">
        <div class="thumbnail">
            <img v-bind:src="list.photo"/>
            <h4>{{ list.description }}</h4>
            <p>posted by: {{ list.member.name }}</p>
        </div>
    </div>`
})

new Vue({
    el: '#app',
    data: {
        posts: []
    },
    methods: {
        hasLogin: function() {
            var retrievedObject = localStorage.getItem('token');
            console.log(retrievedObject)
            if(typeof retrievedObject !== 'string') {
                console.log('keluar lu')            
                window.location.href = "index.html"
            }
        },
        load: function() {
            axios.get("http://localhost:3000/")
            .then(response => {
                this.posts = response.data
              console.log(response.data)
            }) 
            .catch(err => {
                console.log(err)
            })
        }
    },
    mounted: function() {
        this.hasLogin()
        this.load()
    }
})