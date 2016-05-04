$(function () {
    var APPLICATION_ID = "6A7F43DE-F1D4-0C84-FF0E-D579F9C11200",
        SECRET_KEY = "44B2977D-C8AD-8565-FF6D-E1305716E400",
        VERSION = "v1",
        PETER_ID = "44C5DB5B-9190-0AB7-FFAF-1D1846DAAD00";

        
    Backendless.initApp(APPLICATION_ID, SECRET_KEY, VERSION);
     var postsCollection = Backendless.Persistence.of(Posts);   
    
    var currentUser = Backendless.UserService.getCurrentUser();
   if(currentUser !== null){
    
    //var dataQueryPeter = {
      //   condition: "ownerId = " + PETER_ID
    //};
    //var peterTasks = postsCollection.find( dataQueryPeter );
    //var wrapper = {
      //  posts: peterTasks.data
        
    //};
    var everythingTasks = postsCollection.find();
    var wrapper = {
        posts: everythingTasks.data
    };
    }
  else{
    
    
}
 
 
    Handlebars.registerHelper('format', function (time) {
        return moment(time).format("dddd, MMMM Do YYYY");
        
    });
    
    var blogScript = $("#blogs-template").html();
    var blogTemplate = Handlebars.compile(blogScript);
    var blogHTML = blogTemplate(wrapper);
    
    $('.main-container').html(blogHTML);
    
    
    $(document).on('click', '.white-out-post', function (){
        var checkListScript = $("#check-done-template").html();
        var checkListTemplate = Handlebars.compile(checkListScript);
        $('.main-container').html(checkListTemplate);
        console.log("Complete Post");
    });
    
    $(document).on('click', '.white-in-post', function (){
        var uncheckScript = $("#blogs-template").html();
        var uncheckTemplate = Handlebars.compile(uncheckScript);
        $('.main-container').html(uncheckTemplate);
        
    });
    
    $(document).on('click', '.delete-post', function (){
        
        ///Backendless.Persistence.of(Posts).remove("");
    });
   
});
   

function Posts(arga){
    arga = arga || {};
    this.title = arga.title || "";
    this.content = arga.content || "";
    this.authorEmail = arga.authorEmail || "";
    
}

