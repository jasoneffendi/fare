new Vue({
    el: '#app',
    data: {
        posts: []
    },
    methods: {
        hasLogin: function() {
            var retrievedObject = localStorage.getItem('token');
            console.log(retrievedObject)
            console.log(typeof retrievedObject)
            if(typeof retrievedObject !== 'string') {
                console.log('keluar lu')            
                window.location.href = "index.html"
            }
        },
        getFormValues: function getFormValues () {
            var retrievedObject = localStorage.getItem('token');
            if(this.$refs.description.value !== '' && this.$refs.imageURL.value !== '')
            axios.post("http://localhost:3000/post", {
                token: retrievedObject,
                description: this.$refs.description.value,
                photo: this.$refs.imageURL.value})
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
              console.log(this.$refs.description.value)
            // this.output = this.$refs.name.value
          },
          uploadPhoto: function uploadPhoto() {
            console.log('masuk lho')
            console.log(document.getElementById('file').files)
            var output = document.getElementById('output');
            document.getElementById('upload').onclick = function () {
              var data = new FormData();
              data.append('foo', 'bar');
              data.append('image', document.getElementById('file').files[0]);
              var config = {
                onUploadProgress: function(progressEvent) {
                  var percentCompleted = Math.round( (progressEvent.loaded * 100) / progressEvent.total );
                }
              };
              axios.post('http://localhost:3000/upload', data, config)
                .then(function (res) {
                    console.log('masuk sini')
                    var output = document.getElementById('result')
                    output.src = res.data
                    document.getElementById('chosenImage').value = res.data;
                })
                .catch(function (err) {
                  alert(err.message);
                });
            };
          }
    },
    mounted: function() {
        this.hasLogin()
    }
})