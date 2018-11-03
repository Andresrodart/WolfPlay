(function($){
    $(function(){
        $("#submit").on("submit",function  (e) {
            e.preventDefault();
            console.log();
            $.post("/home/proba", $(this).serialize(), function( data ) {
                console.log(data);
                document.getElementById('Result').innerHTML = data;
           });
        })

    }); // end of document ready
})(jQuery); // end of jQuery name space
