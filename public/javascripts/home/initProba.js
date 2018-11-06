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

        $("#numAi").change(function() {
            if($("#numAi").is(":checked"))
                document.getElementById("numA").disabled = true;
            else
                document.getElementById("numA").disabled = false;
        });

        $("#numBi").change(function() {
            if($("#numBi").is(":checked"))
                document.getElementById("numB").disabled = true;
            else
                document.getElementById("numB").disabled = false;
        });

        $(".integrate").validate({
            rules: {
                numA: {
                    required:  function(element){
                        return !$("#numAi").is(":checked");
                    }
                },
                numB: {
                    required:  function(element){
                        return !$("#numBi").is(":checked");
                    },
                    min: function(element){
                        console.log($("#numA").val(),  $("#numB").val(), $("#numA").val() + 1);
                        return ($("#numA").val()*1 + .0000000001);
                    }
                },
                numR: {
                    required: true,
                    min: 0
                },
                numM: {
                    required: true,
                    min: 0
                },
            },
            //For custom messages
            messages: {
                numA:{
                    required: "ingresa el límite inferior",
                },numB:{
                    required: "ingresa el límite superior",
                    min: "ingresa un número mayor al limite inferior"
                },numR: {
                    required: "ingresa sigma",
                    min: "Ingresa un número positivo"
                },numM: {
                    required: "ingresa miu",
                    min: "Ingresa un número positivo"
                }
            },
            errorElement : 'div',
            errorClass: 'invalid',//This will be the error for we would change
            errorPlacement: function(error, element) {
              var placement = $(element).data('invalid');
              if (placement) {
                $(placement).append(error)
              } else {
                error.insertAfter(element);
              }
            }
        });

    }); // end of document ready
})(jQuery); // end of jQuery name space
