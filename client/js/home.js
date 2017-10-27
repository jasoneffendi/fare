Vue.component('post-item', {
    props: ['list'],
    template: `
    <section>
    <div class="row">
    <div class="col s4 offset-s4">
      <div class="card">
        <div class="card-image waves-effect waves-block waves-light">
          <img class="activator" v-bind:src="list.photo">
        </div>
        <div class="card-content">
        <p>posted by: {{ list.member.name }}</p>
        </div>
        <div class="card-reveal">
          <span class="card-title grey-text text-darken-4"><i class="material-icons right">close</i></span>
          <hello><p>{{ list.description }}</p></hello>
        </div>
        
        <!-- Modal Structure -->
        <div id="modalEdit" class="modal">
          <div class="modal-content">
            <h4>Edit Profile</h4>
            <form class="col s12">
              <div class="row">
                <div class="input-field col s12">
                  <input id="last_name" type="text" class="validate">
                  <label for="last_name">Last Name</label>
                </div>
              </div>
              <div class="row">
                <div class="input-field col s12">
                  <input id="password" type="password" class="validate">
                  <label for="password">Password</label>
                </div>
              </div>
              <div class="row">
                <div class="input-field col s12">
                  <input id="email" type="email" class="validate">
                  <label for="email">Email</label>
                </div>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <a href="#!" class="modal-action modal-close waves-effect waves-green btn-flat green">Agree</a>
          </div>
        </div>
    
        <!-- Modal Structure -->
        <div id="modalDelete" class="modal">
          <div class="modal-content">
            <h4>Delete Profile</h4>
            <p>A bunch of text</p>
          </div>
          <div class="modal-footer">
            <a href="#!" class="modal-action modal-close waves-effect waves-green btn-flat">Agree</a>
          </div>
        </div>
      </div>
    </div>
    </div>
    </section>`
})



Vue.component('main-item', {
    template: `  
    <div>
    <nav>
    <div class="nav-wrapper">
    <a href="profile2.html" class="brand-logo right">Profile</a>
      <a href="upload.html" class="brand-logo center">
          <img src="/css/fare.png" alt="">
      </a>
      <input type
    </div>
    </nav> 
    <div class="container">
        <div class="row">
            <div class="input-field col s12">
            <input id="search" type="text" placeholder="Search">
          </button>
        </div>
    </div>
    <div class="row">
        <post-item
        v-for="item in posts"
        v-bind:list="item"
        v-bind:key="item.id">
        </post-item>
    </div>
    </div>
    </div>`,
    data() {
        return {
            posts: []
        }
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

new Vue({
    el: '#app'
})

