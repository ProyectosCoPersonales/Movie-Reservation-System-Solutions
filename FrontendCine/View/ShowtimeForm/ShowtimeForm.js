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


function getJwtToken() {
    return localStorage.getItem("jwtToken");
}

function mostrarSeccion(seccionId) {
    // Oculta todas las secciones
    document.getElementById('crearHorario').style.display = 'none';
    document.getElementById('mostrarHorarios').style.display = 'none';
    // Muestra la sección seleccionada
    if(seccionId == "mostrarHorarios"){
        document.getElementById(seccionId).style.display = 'block';
        DesplegarTabla();
    }else{
        document.getElementById(seccionId).style.display = 'block';
    }
}
// Función para eliminar un horario
function EliminarHorario() {
    var id = document.getElementById('id').value;
    $.ajax({
        type: "DELETE",
        url: "http://localhost:8080/admin/horario/" + id,
        headers: {
            "Authorization": "Bearer " + getJwtToken() 
        },
        success: function(response) {
            alert("Horario eliminado exitosamente");
            DesplegarTabla();
        },
        error: function(error) {
            alert("Error al eliminar el horario");
            console.error("Error:", error);
        }
    });
}

// Función para buscar un horario
function BuscarHorario() {
    var id = document.getElementById('id').value;
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/admin/horario/" + id,
        headers: {
            "Authorization": "Bearer " + getJwtToken() 
        },
        success: function(item) {
            $("#HorariosMostrarDatos > tbody").empty();
            var row =
                "<tr>" +
                "<td>" + item.id + "</td>" +
                "<td>" + item.movie.id + "</td>" +
                "<td>" + item.salas.id + "</td>" +
                "<td>" + item.anio + "</td>" +
                "<td>" + item.mes + "</td>" +
                "<td>" + item.dia + "</td>" +
                "<td>" + item.hora + "</td>" +
                "<td>" + item.minutos + "</td>" +
                "</tr>";
            $("#HorariosMostrarDatos > tbody").append(row);
        },
        error: function(error) {
            alert("Error al buscar el horario");
            console.error("Error:", error);
        }
    });
}

// Función para agregar un nuevo horario
$("#HorarioCine").on("submit", function(event) {
    event.preventDefault();

    // Obtener valores de los campos del formulario
    var movieId = $("#movieId").val();
    var hallId = $("#hallId").val();
    var anio = $("#anio").val();
    var mes = $("#mes").val();
    var dia = $("#dia").val();
    var hora = $("#hora").val();
    var minutos = $("#minutos").val();

    function getDetails() {
        return $.when(
            $.ajax({
                type: "GET",
                url: "http://localhost:8080/admin/movie/" + movieId,
                contentType: "application/json",
                headers: {
                    "Authorization": "Bearer " + getJwtToken() 
                }

            }),
            $.ajax({
                type: "GET",
                url: "http://localhost:8080/admin/salas/" + hallId,
                contentType: "application/json",
                headers: {
                    "Authorization": "Bearer " + getJwtToken() // Incluye el token JWT en el encabezado
                }
            })
        ).done(function(movieResponse, hallResponse) {
            var movie = movieResponse[0]; 
            var hall = hallResponse[0];  

            $.ajax({
                type: "POST",
                url: "http://localhost:8080/admin/horario",
                contentType: "application/json",
                headers: {
                    "Authorization": "Bearer " + getJwtToken() // Incluye el token JWT en el encabezado
                },
                data: JSON.stringify({
                    movie_id: movie,
                    salas_id: hall,
                    año: anio,
                    mes: mes,
                    dia: dia,
                    hora: hora,
                    minutos: minutos
                }),
                success: function(response) {
                    alert("Horario agregado exitosamente");
                    $("#HorarioCine")[0].reset();
                },
                error: function(error) {
                    alert("Error al agregar el horario");
                    console.error("Error:", error);
                }
            });
        }).fail(function(xhr, status, error) {
            alert("Error al obtener detalles");
            console.error("Error al obtener detalles:", status, error);
        });
    }
    getDetails();
});

// Función para desplegar la tabla de horarios
function DesplegarTabla() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/admin/horario",
        dataType: "json",
        headers: {
            "Authorization": "Bearer " + getJwtToken() // Incluye el token JWT en el encabezado
        },
        success: function(data) {
            $("#HorariosMostrarDatos > tbody").empty();
            $.each(data, function(i, item) {
                var row =
                    "<tr>" +
                    "<td>" + item.id + "</td>" +
                    "<td>" + item.movie_id.id + "</td>" +
                    "<td>" + item.salas_id.id + "</td>" +
                    "<td>" + item.anio + "</td>" +
                    "<td>" + item.mes + "</td>" +
                    "<td>" + item.dia + "</td>" +
                    "<td>" + item.hora + "</td>" +
                    "<td>" + item.minutos + "</td>" +
                    "</tr>";
                $("#HorariosMostrarDatos > tbody").append(row);
            });
        },
        error: function(error) {
            console.error("Error al cargar horarios:", error);
        }
    });
}

function generarReservaciones() {
    var token = localStorage.getItem("jwtToken"); 
    
    $.ajax({
        type: "POST",
        url: "http://localhost:8080/admin/reservations/generate",
        headers: {
            "Authorization": "Bearer " + token
        },
        success: function(response) {
            alert("Reservaciones generadas exitosamente");
        },
        error: function(error) {
            alert("Error al generar las reservaciones");
            console.error("Error:", error);
        }
    });
}







