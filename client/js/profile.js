Vue.component('profile-section', {
    template: `
    <div>
    <nav>
    <div class="nav-wrapper">
      <a href="#" class="brand-logo center">
          <img src="/css/fare.png" alt="">
      </a>
    </div>
  </nav>

  <div class="container">
    <div class="row">
      <div class="col s4 offset-s4">
        <div class="card">
          <div class="card-image waves-effect waves-block waves-light">
            <img class="activator" src="../css/jacket2.jpg">
          </div>
          <div class="card-content">
            <span class="card-title activator grey-text text-darken-4">{{ data.name }}<i class="material-icons right">more_vert</i></span>
            <p>
              <a class="waves-effect waves-light btn modal-trigger" href="#modalEdit">Edit</a>
              <a class="waves-effect waves-light btn modal-trigger right" href="#modalDelete">Delete</a>
            </p>
          </div>
          <div class="card-reveal">
            <span class="card-title grey-text text-darken-4">{{ data.name }}<i class="material-icons right">close</i></span>
            <p>password: {{ data.password }}<br> email: {{ data.email }}</p>
          </div>
          
          <!-- Modal Structure -->
          <div id="modalEdit" class="modal">
            <div class="modal-content">
              <h4>Edit Profile</h4>
              <form class="col s12">
                <div class="row">
                  <div class="input-field col s12">
                    <input id="name" type="text" class="validate" ref="name">
                    <label for="name">Name</label>
                  </div>
                </div>
                <div class="row">
                  <div class="input-field col s12">
                    <input id="password" type="password" class="validate" ref="password">
                    <label for="password">Password</label>
                  </div>
                </div>
                <div class="row">
                  <div class="input-field col s12">
                    <input id="email" type="email" class="validate" ref="email">
                    <label for="email">Email</label>
                  </div>
                </div>
              </form>
            </div>
            <div class="modal-footer">
              <a href="#!" class="modal-action modal-close waves-effect waves-green btn-flat green" v-on:click="getFormValues()">Agree</a>
            </div>
          </div>

          <!-- Modal Structure -->
          <div id="modalDelete" class="modal">
            <div class="modal-content">
              <h4>Delete Profile</h4>
              <p>A bunch of text</p>
            </div>
            <div class="modal-footer">
              <a href="#!" class="modal-action modal-close waves-effect waves-green btn-flat" v-on:click="del()">Agree</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  </div>`,
  data() {
    return {
        data: ''
    }
  },
    methods: {
      getFormValues: function getFormValues () {
        var retrievedObject = localStorage.getItem('token');
        console.log(retrievedObject)
        axios.put("http://localhost:3000/users", {
            token: retrievedObject,
            name: this.$refs.name.value,
            password: this.$refs.password.value,
            email: this.$refs.email.value
        })
        .then(response => {
            // if(response) {
            //     console.log(response)
            //     window.location.href = "index.html"
            // }
            console.log(response.data)
        }) 
        .catch(err => {
            console.log(err)
        })
          console.log(this.$refs.name.value)
        // this.output = this.$refs.name.value
      },
      del: function() {
            var retrievedObject = localStorage.getItem('token');
            console.log(retrievedObject)
          axios.delete("http://localhost:3000/users", {
              params: {token: retrievedObject}
          })
          .then(response => {
            //   window.location.href="index.html"
            console.log(response)
          })
          .catch(err => {
            console.log(err)
          })
      },
      hasLogin: function() {
        var retrievedObject = localStorage.getItem('token');
        console.log(retrievedObject)
        if(typeof retrievedObject !== 'string') {
            console.log('keluar lu')            
            window.location.href = "index.html"
        }
      },
      getData: function() {
        var retrievedObject = localStorage.getItem('token');
        console.log(retrievedObject)
        axios.post("http://localhost:3000/users/one", {
            token: retrievedObject
        })
        .then(response => {
            console.log(response)
            this.data = response.data
            console.log(this.data)
        })
        .catch(err => {
            console.log(err)
        })
      }
    },
    mounted: function () {
        this.hasLogin()
        this.getData()
    }
  })
  
  var app = new Vue({
    el: '#app'
  })