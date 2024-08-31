var horarioId = 4;
let columnasLado = 4; // Número de columnas en los grupos laterales
let columnasCentro = 16; // Número de columnas en el grupo central
let filas = 6;
const letras = ['A', 'B', 'C', 'D', 'E', 'F'];
const grupos = [
  { selector: '.asientos-lado:first-child table', columnas: columnasLado },
  { selector: '.asientos-centro table', columnas: columnasCentro },
  { selector: '.asientos-lado:last-child table', columnas: columnasLado }
];

let numeroAsiento = 1;

grupos.forEach((grupo) => {
  const thead = document.querySelector(`${grupo.selector} thead`);
  const tbody = document.querySelector(`${grupo.selector} tbody`);

  // Crear encabezado (números de columnas)
  let filaThead = thead.insertRow();
  filaThead.insertCell(); // Celda vacía para las letras de las filas
  for (let i = 0; i < grupo.columnas; i++) {
    filaThead.insertCell().innerHTML = numeroAsiento;
    numeroAsiento++;
  }

  numeroAsiento -= grupo.columnas;

  for (let i = 0; i < filas; i++) {
    let filaTbody = tbody.insertRow();
    filaTbody.insertCell().innerHTML = letras[i]; 
    for (let j = 0; j < grupo.columnas; j++) {
        let celda = filaTbody.insertCell();
        let boton = document.createElement('button');
        boton.className = 'asiento-btn no-seleccionado';
        boton.dataset.asiento = `${letras[i]}${numeroAsiento}`;
        boton.innerHTML = `<i class="material-icons">event_seat</i><br>${letras[i]}${numeroAsiento}`;
        celda.appendChild(boton);

        boton.addEventListener('click', () => {
            if (!boton.classList.contains('ocupado')) {
                boton.classList.toggle('seleccionado');
                boton.classList.toggle('no-seleccionado');
            }
        });

        numeroAsiento++;
    }

    numeroAsiento -= grupo.columnas;
}

numeroAsiento += grupo.columnas;
});


obtenerAsientosOcupados(showtimeId);


function marcarComoOcupado(asientoId) {

  const asiento = document.querySelector(`button[data-asiento="${asientoId}"]`);
  
  if (asiento) {
    asiento.classList.add('ocupado');
    asiento.classList.remove('seleccionado', 'no-seleccionado');
    asiento.disabled = true; 
  } else {
    console.error('Asiento no encontrado:', asientoId);
  }
}


document.querySelector('#mostrar-asientos').addEventListener('click', () => {
  let asientosSeleccionados = [];
  document.querySelectorAll('.seleccionado').forEach(btn => {
    asientosSeleccionados.push(btn.dataset.asiento);
  });
  console.log('Asientos seleccionados:', asientosSeleccionados);
});
let precioPorAsiento = 10;
document.querySelector('#mostrar-asientos').addEventListener('click', () => {
    let asientosSeleccionados = [];
    document.querySelectorAll('.seleccionado').forEach(btn => {
        asientosSeleccionados.push(btn.dataset.asiento);
      });
    let total = asientosSeleccionados.length * precioPorAsiento;
    document.getElementById('asientos-seleccionados').textContent = `Asientos seleccionados: ${asientosSeleccionados.join(', ')}`;
    document.getElementById('precio-final').textContent = `Precio total: $${total.toFixed(2)}`;
    document.getElementById('reservar-btn').style.display = 'inline-block';
  });




let asientosSeleccionados = [];

document.querySelector('#reservar-btn').addEventListener('click', () => {
    asientosSeleccionados = [];
    document.querySelectorAll('.seleccionado').forEach(btn => {
        asientosSeleccionados.push(btn.dataset.asiento);
        btn.classList.add('ocupado');
        btn.classList.remove('seleccionado');
        btn.disabled = true;
    });

    alert(`Reserva realizada para los asientos: ${asientosSeleccionados.join(', ')}`);
    document.getElementById('asientos-seleccionados').textContent = '';
    document.getElementById('precio-final').textContent = '';
    document.getElementById('reservar-btn').style.display = 'none';

    enviarAsientosSeleccionados(showtimeId);
});




function mostrarReservaciones(reservations) {
  const reservationsList = document.getElementById('reservations-list');
  reservationsList.innerHTML = '';
  reservations.forEach(reservation => {
      reservationsList.innerHTML += `<p>Reservation ID: ${reservation.id}, Showtime ID: ${reservation.showtimeId}</p>`;
  });
}




async function enviarAsientosSeleccionados(horarioId) {
  const jwtToken = localStorage.getItem("jwtToken");

  if (asientosSeleccionados.length === 0) {
      alert('No has seleccionado ningún asiento.');
      return;
  }

  try {
      const response = await fetch(`http://localhost:8080/user/reservation/${horarioId}/add-seats`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${jwtToken}`
          },
          body: JSON.stringify(asientosSeleccionados)
      });

      if (!response.ok) {
          throw new Error('Error al enviar los asientos.');
      }

      const result = await response.json();

      if (result.message) {
          alert(result.message);

          asientosSeleccionados.forEach(asiento => {
              marcarComoOcupado(asiento);
          });


          await obtenerAsientosOcupados(horarioId);
      } else {
          alert('Hubo un problema al reservar los asientos.');
      }

  } catch (error) {
      console.error('Error:', error);
      alert('Ocurrió un error al reservar los asientos.');
  }
}




async function obtenerAsientosOcupados(horarioId) {
  const jwtToken = localStorage.getItem("jwtToken");

  try {
      const response = await fetch(`http://localhost:8080/user/reservation/${horarioId}/occupied-seats`, {
          headers: {
              'Authorization': `Bearer ${jwtToken}`
          }
      });

      if (!response.ok) {
          throw new Error('Error al obtener los asientos ocupados.');
      }

      const asientosOcupados = await response.json();

      // Marcar todos los asientos ocupados en la UI
      asientosOcupados.forEach(asiento => {
          marcarComoOcupado(asiento);
      });

  } catch (error) {
      console.error('Error:', error);
      alert('Ocurrió un error al obtener los asientos ocupados.');
  }
}



