var passwordPairs = {
    "sarahford": "password",
    "sford85": "password2"
  }
  
  function check(form) {
    if (passwordPairs[form.userid.value] === form.pswrd.value)
    { 
      window.open('target.html');
      alert("success");
      return false;
    }
  }

  window.fbAsyncInit = function() {
    FB.init({
      appId      : process.env.app_id,
      cookie     : true,
      xfbml      : true,
      version    : 'v2.8'
    });
    FB.AppEvents.logPageView();
  };

  (function(d, s, id){
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {return;}
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));

  function checkLoginState() {
    FB.getLoginStatus(function(res) {
      let fbtoken = res.authResponse.accessToken
      axios.post('http://localhost:3000/', {
        fbtoken: fbtoken
      })
      .then(function (response) {
        // console.log(response);
        // window.location.replace("https://www.tutorialrepublic.com/");
        // $('.test').append(`<img src="${response.data.picture.data.url}" alt="">`)
        // console.log(response.data);
        localStorage.setItem("token", response.data);
        window.location.replace("/homepage.html");
      })

    });
  }