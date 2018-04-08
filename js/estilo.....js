

function cambiarEstilo1(){
   $("body").css("background-color", "yellowgreen");

   $(".container-fluid").css({
                             "text-align": "left", 
                             "background-color":"yellowgreen"
    });
    guardarEstilo(estilo)

}
function cambiarEstilo2(){
    $("body").css("background-color", "whitesmoke");

    $(".container-fluid").css("background-color","whitesmoke");
 }

 /*
$("#btn_estilos").click(function(e){
  e.preventDefault();
  var rutaEstilo = $(this).attr("href")
  $("#linkestilo").attr("href", rutaEstilo)
})
*/