// Obtener el elemento donde se mostrará la fecha y hora
var fechaHoraElemento = document.getElementById("fecha-hora");

// Función para obtener la fecha y hora actual
function obtenerFechaHora() {
  var fechaHora = new Date();
  var fecha = fechaHora.toLocaleDateString();
  var hora = fechaHora.toLocaleTimeString();

  return fecha + " - " + hora;
}

// Actualizar la fecha y hora en el elemento
fechaHoraElemento.textContent = obtenerFechaHora();


// Obtener el elemento donde se mostrará la ubicación
var ubicacionElemento = document.getElementById("ubicacion");

// Función para actualizar la fecha y hora en el elemento
function actualizarFechaHora() {
    fechaHoraElemento.textContent = obtenerFechaHora();
  }
  
  // Actualizar la fecha y hora inicialmente
  actualizarFechaHora();
  
  // Actualizar la fecha y hora cada segundo
  setInterval(actualizarFechaHora, 1000);

// Función para obtener la ubicación del usuario
function obtenerUbicacion() {
    navigator.geolocation.getCurrentPosition(function(position) {
      var latitud = position.coords.latitude;
      var longitud = position.coords.longitude;
  
      const geoApiUrl = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitud}&longitude=${longitud}&localityLanguage=es`;
  
      fetch(geoApiUrl)
        .then(res => res.json())
        .then(data => {
        console.log(data)
          var city = data.locality + " - " + data.city;
          // Aquí puedes hacer lo que necesites con la variable "location"
          ubicacionElemento.textContent = city;
        })
        .catch(error => {
          ubicacionElemento.textContent = "Error al obtener la ubicación";
          console.log(error);
        });
    }, function(error) {
      ubicacionElemento.textContent = "No se pudo obtener la ubicación";
    });
  }
  
  // Obtener la ubicación del usuario
  obtenerUbicacion();
  
