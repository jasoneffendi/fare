Vue.component('post-item', {
    props: ['list'],
    template: ` 
    <section>
    <div class="col-lg-2 col-sm-3 col-xs-4" id="content">
        <div class="thumbnail">
            <img v-bind:src="list.photo"/>
            <h4>{{ list.description }}</h4>
            <p>posted by: {{ list.member.name }}</p>
        </div>
    </div>
    </section>`
})

Vue.component('main-item', {
    template: `  
    <div>
    <nav class="navbar navbar-default">
    <div class="container-fluid">
      <div class="navbar-header">
        <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
          <span class="sr-only">Toggle navigation</span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </button>
        <img class="logo" src="./css/fare.png" alt="">
      </div>
    
      <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
        <ul class="nav navbar-nav">
          <li class="active"><a href="#">Link <span class="sr-only">(current)</span></a></li>
          <li><a href="#">Link</a></li>
          <li class="dropdown">
            <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">Dropdown <span class="caret"></span></a>
            <ul class="dropdown-menu" role="menu">
              <li><a href="#">Action</a></li>
              <li><a href="#">Another action</a></li>
              <li><a href="#">Something else here</a></li>
              <li class="divider"></li>
              <li><a href="#">Separated link</a></li>
              <li class="divider"></li>
              <li><a href="#">One more separated link</a></li>
            </ul>
          </li>
        </ul>
        <form class="navbar-form navbar-left" role="search">
          <div class="form-group">
            <input type="text" class="form-control" placeholder="Search" id="search">
          </div>
          <button type="submit" class="btn btn-default" id="enter">Submit</button>
        </form>
        <ul class="nav navbar-nav navbar-right">
          <li><a href="#">Link</a></li>
        </ul>
      </div>
    </div>
    </nav>  
    <div class="row">
    <post-item
    v-for="item in posts"
    v-bind:list="item"
    v-bind:key="item.id">
    </post-item>
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

