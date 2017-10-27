Vue.component('login-section', {
    template: `
    <div>
    <img class="logo" src="/css/fare.png"></img>
    <form name="login">
  
        <input type="text" class="form-control" placeholder="Username" name="name" ref="name"/>
  
        <input type="password" class="form-control" id="pass" placeholder="Password" name="password" ref="password"/>

        <input type="email" class="form-control" id="pass" placeholder="Email" name="email" ref="email"/>
        
        <input class="btn btn-primary" type="button" @click.prevent="getFormValues()" value="Register" />
    </form>
    </div>`,
    methods: {
      getFormValues: function getFormValues () {
        axios.post("http://localhost:3000/users", {
            name: this.$refs.name.value,
            password: this.$refs.password.value,
            email: this.$refs.email.value
        })
        .then(response => {
            if(response) {
                console.log(response)
                window.location.href = "index.html"
            }
            console.log(response.data)
        }) 
        .catch(err => {
            console.log(err)
        })
          console.log(this.$refs.name.value)
        // this.output = this.$refs.name.value
      }
    },
    mounted: function () {
        localStorage.removeItem('token')
    }
  })
  
  var app = new Vue({
    el: '#app'
  })