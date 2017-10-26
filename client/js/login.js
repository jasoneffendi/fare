var app = new Vue({
  el: '#app',
  data: {
    message: 'Hello Lively Fox!',
    data: [],
    output: ''
  },
  methods : {
    getFormValues: function getFormValues () {
      axios.post("http://localhost:3000/users/login", {
          name: this.$refs.name.value,
          password: this.$refs.password.value})
      .then(response => {
          if(response) {
              console.log(response)
              localStorage.setItem('token', response.data)
              window.location.href = "home.html"
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