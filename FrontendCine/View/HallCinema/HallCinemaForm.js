var actualizarHora = function(){
    
    var fecha = new Date(),
        horas = fecha.getHours(),
        minutos = fecha.getMinutes(),
        amPm,
        segundos = fecha.getSeconds(),
        diaDeSemana = fecha.getDay(),
        dia = fecha.getDate(),
        mes = fecha.getMonth(),
        anio = fecha.getFullYear();

        var NombreDeSemana = ['Domingo','Lunes','Martes','Miercoles','Jueves','Viernes','Sabado'];
        var NombreDeMes = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Setiembre','Octubre','Noviembre','Diciembre'];

            var pHoras = document.getElementById("hora"),
            pMinutos = document.getElementById("minutos"),
            pAmPm = document.getElementById("ampm"),
            pSegundos = document.getElementById("segundos"),
            pDiaDeSemana = document.getElementById("diaSemana"),
            pDia = document.getElementById("dia"),
            pMes = document.getElementById("mes"),
            pAnio = document.getElementById("year");

    if(horas > 12){
        amPm = "PM";
    }else{
        amPm = "AM";
    }
    
    if(minutos < 10){
        minutos = "0" + minutos;
    }
    if(segundos < 10){
            segundos = "0" + segundos;
    }


        pHoras.textContent = horas,
        pMinutos.textContent = minutos,
        pSegundos.textContent = segundos,
        pAmPm.textContent = amPm,
        pDiaDeSemana.textContent = NombreDeSemana[diaDeSemana],
        pDia.textContent = dia,
        pMes.textContent = NombreDeMes[mes],
        pAnio.textContent = anio;
    
    
}

actualizarHora();
setInterval(actualizarHora,1000);

$(document).ready(function(){
    
    $(".contenedor-formularios").find("input, textarea").on("keyup blur focus", function (e) {

        var $this = $(this),
          label = $this.prev("label");

        if (e.type === "keyup") {
            if ($this.val() === "") {
                label.removeClass("active highlight");
            } else {
                label.addClass("active highlight");
            }
        } else if (e.type === "blur") {
            if($this.val() === "") {
                label.removeClass("active highlight"); 
                } else {
                label.removeClass("highlight");   
                }   
        } else if (e.type === "focus") {
            if($this.val() === "") {
                label.removeClass("highlight"); 
            } 
            else if($this.val() !== "") {
                label.addClass("highlight");
            }
        }

    });

    $(".tab a").on("click", function (e) {

        e.preventDefault();

        $(this).parent().addClass("active");
        $(this).parent().siblings().removeClass("active");

        target = $(this).attr("href");

        $(".contenido-tab > div").not(target).hide();

        $(target).fadeIn(600);

    });
    
});

function mostrarSeccion(seccionId) {

    document.getElementById('crearSala').style.display = 'none';
    document.getElementById('mostrarSalas').style.display = 'none';
    // Muestra la sección seleccionada
    if(seccionId=="mostrarSalas"){
        document.getElementById(seccionId).style.display = 'block';
        DesplegarTabla();
    }else{
        document.getElementById(seccionId).style.display = 'block';
    }
}


var jwtToken = localStorage.getItem("jwtToken");

function EliminarSala() {
    var id = document.getElementById('id').value;
    $.ajax({
        type: "DELETE",
        url: "http://localhost:8080/admin/salas/" + id,
        headers: {
            "Authorization": "Bearer " + jwtToken
        },
        success: function(response) {
            alert("Sala eliminada exitosamente");
            DesplegarTabla();
        },
        error: function(error) {
            alert("Error al eliminar la sala");
            console.error("Error:", error);
        }
    });
    DesplegarTabla();
}

function BuscarSala() {
    var id = document.getElementById('id').value;
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/admin/salas/" + id,
        headers: {
            "Authorization": "Bearer " + jwtToken
        },
        success: function(item) {
            $("#HallsMostrarDatos > tbody").empty();
            var row =
                "<tr>" +
                "<td>" + item.id + "</td>" +
                "<td>" + item.nombre + "</td>" +
                "<td>" + item.capacidad + "</td>" +
                "</tr>";
            $("#HallsMostrarDatos > tbody").append(row);
        },
        error: function(error) {
            alert("Error al buscar la sala");
            console.error("Error:", error);
        }
    });
}

$("#HallCinema").on("submit", function(event) {
    event.preventDefault();
    var nombre = $("#nombre").val();
    var capacidad = $("#capacidad").val();

    $.ajax({
        type: "POST",
        url: "http://localhost:8080/admin/salas",
        headers: {
            "Authorization": "Bearer " + jwtToken
        },
        contentType: "application/json",
        data: JSON.stringify({
            nombre: nombre,
            capacidad: capacidad
        }),
        success: function(response) {
            alert("Sala agregada exitosamente");
            $("#HallCinema")[0].reset();
        },
        error: function(error) {
            alert("Error al agregar la sala");
            console.error("Error:", error);
        }
    });
});

function DesplegarTabla() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/admin/salas",
        headers: {
            "Authorization": "Bearer " + jwtToken
        },
        dataType: "json",
        success: function(data) {
            $("#HallsMostrarDatos > tbody").empty();
            $.each(data, function(i, item) {
                var row =
                    "<tr>" +
                    "<td>" + item.id + "</td>" +
                    "<td>" + item.nombre + "</td>" +
                    "<td>" + item.capacidad + "</td>" +
                    "</tr>";
                $("#HallsMostrarDatos > tbody").append(row);
            });
        },
        error: function(error) {
            console.error("Error al cargar salas:", error);
        }
    });
}
