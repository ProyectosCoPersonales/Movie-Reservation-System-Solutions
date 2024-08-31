$(function () {
    let datosCards = [];

    function pintarCards(contenedor, datos) {
        datos.forEach((card) => {

            contenedor.append(`
                <div class="card">
                    <img src="${card.posterImage}" alt="${card.nombre}">
                    <a class="btn-3" href="/Reservation/index.html?movieId=${card.id}">
                        <span>RESERVAR</span>
                    </a>
                </div>
            `);
        });
    }


    var token = localStorage.getItem("jwtToken");
    if (token) {
        console.log("Token:", token);
        $.ajax({
            url: 'http://localhost:8080/user/movie',
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + token
            },
            success: function(data) {
                datosCards = data;
                pintarCards($("main"), datosCards);
            },
            error: function(err) {
                console.error("Error:", err);
            }
        });
    } else {
        console.log("No se encontró el token.");
    }
});
