 $(function () {
    var APPLICATION_ID = "6A7F43DE-F1D4-0C84-FF0E-D579F9C11200",
        SECRET_KEY = "44B2977D-C8AD-8565-FF6D-E1305716E400",
        VERSION = "v1";
        
    Backendless.initApp(APPLICATION_ID, SECRET_KEY, VERSION);
    
    if(Backendless.UserService.isValidLogin()){
        userLoggedIn(Backendless.LocalCache.get("current-user-id"));
    }
    //Commiting
    
    else {
    var loginScript = $("#login-template").html();
    var loginTemplate = Handlebars.compile(loginScript);
    $('.main-container').html(loginTemplate);
    }
    //Test Commit
    $(document).on('submit', '.form-signin', function(event){
        event.preventDefault();
        
        var data = $(this).serializeArray(),
            email = data[0].value,
            password = data[1].value;
            
        Backendless.UserService.login(email, password, true, new Backendless.Async(userLoggedIn, gotError));
    });
    
    $(document).on('click', '.add-blog', function(){
        var addBlogScript = $("#add-blog-template").html();
        var addBlogTemplate = Handlebars.compile(addBlogScript);
        $('.main-container').html(addBlogTemplate);
        tinymce.init({ selector:'textarea' });
        
    });
    $(document).on('submit', '.form-add-blog', function(event){
        event.preventDefault();
        
        var x;
        x = document.getElementById("title").value;
       var y;
       y = document.getElementById("content").value;

       if (x === ""){

           Materialize.toast('Title Field cannot be empty', 4000, 'rounded');

           return false;

       }

       if (y === ""){

           Materialize.toast('Content Field cannot be empty', 4000, 'rounded');

           return false;

       }

       else {
        var data = $(this).serializeArray(),
            title = data[0].value,
            content = data[1].value;
            
            var dataStore = Backendless.Persistence.of(Posts);
            
            var postObject = new Posts({
                title: title,
                content: content,
                authorEmail: Backendless.UserService.getCurrentUser().email
            });
            
            dataStore.save(postObject);
            
           
            this.title.value = "";
            this.content.value = "";
        }        
    });
    
    $(document).on('click', '.logout', function (){
        Backendless.UserService.logout(new Backendless.Async(userLoggedOut, gotError));
        
        var loginScript = $("#login-template").html();
        var loginTemplate = Handlebars.compile(loginScript);
        $('.main-container').html(loginTemplate);
    });
    
});

function Posts(arga){
    arga = arga || {};
    this.title = arga.title || "";
    this.content = arga.content || "";
    this.authorEmail = arga.authorEmail || "";
    
}

function userLoggedIn(user) {
    console.log("user successfully logged in");
    if(typeof user === "string") {
        userData = Backendless.Data.of(Backendless.User).findById(user);
    }
    else {
        userData = user;
    }
    var welcomeScript = $('#welcome-template').html();
    var welcomeTemplate = Handlebars.compile(welcomeScript);
    var welcomeHTML = welcomeTemplate(userData);
    
    $('.main-container').html(welcomeHTML);
    
}

function gotError (error) {
    console.log("Error message - " + error.message);
    console.log("Error code - " + error.code);
    Materialize.toast('Incorrect Username or Password', 4000);

}

function userLoggedOut(){
    console.log("successfully logged out");
}