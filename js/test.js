
var universidades;
var estilo;

$(function() {
    $.get("./data/universidades.json", function(data, status) {
        estilo=recuperarEstilo();
        universidades = new Map(data.map((universidad) => [getId(universidad), universidad]));
        mostrarUniversidades(data);
    });
});

function mostrarUniversidades(data){
    var index;

    $.each(data, function(index,universidad){
        var id = getId(universidad);
        agregarUniversidad(id,universidad);
    })
} 

function getId(universidad) {
    return universidad.nombre.replace(/\s/g, '');
}

function agregarUniversidad(id,universidad){
    var row = $("<tr></tr>").attr("id", id);
    row.append($("<td></td").text(universidad.nombre));
    $("#tabla").append(row);
}



function cambiarEstilo1(){
    $("body").css("background-color", "yellowgreen");
 
    $(".container-fluid").css({
                              "text-align": "left", 
                              "background-color":"yellowgreen"
     });
    guardarEstilo(estilo);
 }

 function cambiarEstilo2(){
     $("body").css("background-color", "whitesmoke");
 
     $(".container-fluid").css("background-color","whitesmoke");

     guardarEstilo(estilo);
  }
 
  /*
 $("#btn_estilos").click(function(e){
   e.preventDefault();
   var rutaEstilo = $(this).attr("href")
   $("#linkestilo").attr("href", rutaEstilo)
 })
 */