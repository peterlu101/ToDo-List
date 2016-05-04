$(function () {
    var APPLICATION_ID = "6A7F43DE-F1D4-0C84-FF0E-D579F9C11200",
        SECRET_KEY = "44B2977D-C8AD-8565-FF6D-E1305716E400",
        VERSION = "v1";
        
    Backendless.initApp(APPLICATION_ID, SECRET_KEY, VERSION);
    
  
    
        var addBlogScript = $("#add-blog-template").html();
        var addBlogTemplate = Handlebars.compile(addBlogScript);
        $('.main-container').html(addBlogTemplate);
        tinymce.init({ selector:'textarea' });
        
    
    
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
});
   

function Posts(arga){
    arga = arga || {};
    this.title = arga.title || "";
    this.content = arga.content || "";
    this.authorEmail = arga.authorEmail || "";
    
}

 