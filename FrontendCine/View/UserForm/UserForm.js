var actualizarHora = function () {
  var fecha = new Date(),
    horas = fecha.getHours(),
    minutos = fecha.getMinutes(),
    amPm,
    segundos = fecha.getSeconds(),
    diaDeSemana = fecha.getDay(),
    dia = fecha.getDate(),
    mes = fecha.getMonth(),
    anio = fecha.getFullYear();

  var NombreDeSemana = [
    "Domingo",
    "Lunes",
    "Martes",
    "Miercoles",
    "Jueves",
    "Viernes",
    "Sabado",
  ];
  var NombreDeMes = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Setiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];

  var pHoras = document.getElementById("hora"),
    pMinutos = document.getElementById("minutos"),
    pAmPm = document.getElementById("ampm"),
    pSegundos = document.getElementById("segundos"),
    pDiaDeSemana = document.getElementById("diaSemana"),
    pDia = document.getElementById("dia"),
    pMes = document.getElementById("mes"),
    pAnio = document.getElementById("year");

  if (horas > 12) {
    amPm = "PM";
  } else {
    amPm = "AM";
  }

  if (minutos < 10) {
    minutos = "0" + minutos;
  }
  if (segundos < 10) {
    segundos = "0" + segundos;
  }

  (pHoras.textContent = horas),
    (pMinutos.textContent = minutos),
    (pSegundos.textContent = segundos),
    (pAmPm.textContent = amPm),
    (pDiaDeSemana.textContent = NombreDeSemana[diaDeSemana]),
    (pDia.textContent = dia),
    (pMes.textContent = NombreDeMes[mes]),
    (pAnio.textContent = anio);
};

actualizarHora();
setInterval(actualizarHora, 1000);

$(document).ready(function () {
  $(".contenedor-formularios")
    .find("input, textarea")
    .on("keyup blur focus", function (e) {
      var $this = $(this),
        label = $this.prev("label");

      if (e.type === "keyup") {
        if ($this.val() === "") {
          label.removeClass("active highlight");
        } else {
          label.addClass("active highlight");
        }
      } else if (e.type === "blur") {
        if ($this.val() === "") {
          label.removeClass("active highlight");
        } else {
          label.removeClass("highlight");
        }
      } else if (e.type === "focus") {
        if ($this.val() === "") {
          label.removeClass("highlight");
        } else if ($this.val() !== "") {
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
  // Oculta todas las secciones
  document.getElementById("crearUsuario").style.display = "none";
  document.getElementById("mostrarUsuarios").style.display = "none";
  // Muestra la sección seleccionada
  if (seccionId == "mostrarUsuarios") {
    document.getElementById(seccionId).style.display = "block";
    DesplegarTabla();
  } else {
    document.getElementById(seccionId).style.display = "block";
  }
}

// Obtén el token JWT del almacenamiento local o de donde lo tengas guardado
function getJwtToken() {
    return localStorage.getItem("jwtToken");
  }
  
  function EliminarUsuario() {
    var id = document.getElementById("id").value;
    $.ajax({
      type: "DELETE",
      url: "http://localhost:8080/admin/users/" + id,
      headers: {
        "Authorization": "Bearer " + getJwtToken()
      },
      success: function (response) {
        alert("Usuario eliminado exitosamente");
      },
      error: function (error) {
        alert("Error al eliminar el usuario");
        console.error("Error:", error);
      },
    });
    DesplegarTabla();
  }
  
  function BuscarUsuario() {
    var id = document.getElementById("id").value;
    $.ajax({
      type: "GET",
      url: "http://localhost:8080/admin/users/" + id,
      headers: {
        "Authorization": "Bearer " + getJwtToken()
      },
      success: function (item) {
        $("#UsersMostrarDatos > tbody").empty();
        var row =
          "<tr>" +
          "<td>" +
          item.id +
          "</td>" +
          "<td>" +
          item.username +
          "</td>" +
          "<td>" +
          item.password +
          "</td>" +
          "<td>" +
          item.firstname +
          "</td>" +
          "<td>" +
          item.lastname +
          "</td>" +
          "<td>" +
          item.country +
          "</td>" +
          "<td>" +
          item.role +
          "</td>" +
          "</tr>";
        $("#UsersMostrarDatos > tbody").append(row);
      },
      error: function (error) {
        alert("Error al buscar el usuario");
        console.error("Error:", error);
      },
    });
  }
  
  $("#User").on("submit", function (event) {
    event.preventDefault();
    var username = $("#username").val();
    var password = $("#password").val();
    var firstname = $("#name").val();
    var lastname = $("#last").val();
    var country = $("#pais").val();
    var role = $("#role").val();
  
    $.ajax({
      type: "POST",
      url: "http://localhost:8080/admin/users",
      contentType: "application/json",
      headers: {
        "Authorization": "Bearer " + getJwtToken()
      },
      data: JSON.stringify({
        username: username,
        password: password,
        firstname: firstname,
        lastname: lastname,
        country: country,
        role: role
      }),
      success: function (response) {
        alert("Usuario agregado exitosamente");
        $("#User")[0].reset();
      },
      error: function (error) {
        alert("Error al agregar el usuario");
        console.error("Error:", error);
      },
    });
  });
  
  function DesplegarTabla() {
    $.ajax({
      type: "GET",
      url: "http://localhost:8080/admin/users",
      dataType: "json",
      headers: {
        "Authorization": "Bearer " + getJwtToken()
      },
      success: function (data) {
        $("#UsersMostrarDatos > tbody").empty();
        $.each(data, function (i, item) {
          var row =
            "<tr>" +
            "<td>" +
            item.id +
            "</td>" +
            "<td>" +
            item.username +
            "</td>" +
            "<td>" +
            item.password +
            "</td>" +
            "<td>" +
            item.firstname +
            "</td>" +
            "<td>" +
            item.lastname +
            "</td>" +
            "<td>" +
            item.country +
            "</td>" +
            "<td>" +
            item.role +
            "</td>" +
            "</tr>";
          $("#UsersMostrarDatos > tbody").append(row);
        });
      },
      error: function (error) {
        console.error("Error al cargar usuarios:", error);
      },
    });
  }
  