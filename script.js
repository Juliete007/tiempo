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



// Obtener el elemento donde se mostrará la ubicación
var ubicacionElemento = document.getElementById("ubicacion");

// Función para actualizar la fecha y hora en el elemento
function actualizarFechaHora() {
  const fechaHoraElemento = document.getElementById('fecha-hora');
  fechaHoraElemento.textContent = obtenerFechaHora();
}

// Actualizar la fecha y hora inicialmente
actualizarFechaHora();

// Actualizar la fecha y hora cada segundo
setInterval(actualizarFechaHora, 1000);

var ciudadActual = ""; // Variable global para almacenar la ciudad

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
          var ciudad = data.city
          ciudadActual = ciudad;// Guardar la ciudad en la variable global
          // Aquí puedes hacer lo que necesites con la variable "ciudadActual"
          obtenerTiempo(ciudadActual);
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

// archivo.js
function pedirUsuario() {

  var nombreUsuarioValido1 = "Julio";
  var nombreUsuarioValido2 = "Oscar";
  var nombreUsuario = "";

  

  var boton = document.querySelector(".boton-logout");
  
  // Verificar el estado actual del botón
  if (boton.classList.contains("log-out")) {
    // Si el botón está en estado de "Log Out"
    boton.classList.remove("log-out");
    boton.classList.add("log-in");
    boton.innerHTML = `
      <span class="material-symbols-outlined">
        login
      </span>
      <p>Log in</p>
    `;
    var nombreUsuarioContainer = document.getElementById("nombreUsuarioContainer");
    nombreUsuarioContainer.textContent = "";
    var fotoPerfil = document.getElementById("fotoPerfil");
    fotoPerfil.src = "";
    var saludoElement = document.querySelector(".saludo");
    saludoElement.textContent = "Iniciar sesión";
    var fotoPerfilElement = document.getElementById("fotoPerfil");
    fotoPerfilElement.src = "";
    
    fotoPerfilElement.style.opacity = "0";

  } else {
    // Si el botón está en estado de "Log In"
    boton.classList.remove("log-in");
    boton.classList.add("log-out");
    boton.innerHTML = `
      <span class="material-symbols-outlined">
        logout
      </span>
      <p>Log out</p>
    `;

    while (nombreUsuario !== nombreUsuarioValido1 && nombreUsuario !== nombreUsuarioValido2) {
      nombreUsuario = prompt("Ingrese su nombre de usuario:");

      if (nombreUsuario) {
          if (nombreUsuario === nombreUsuarioValido1 || nombreUsuario === nombreUsuarioValido2) {
              var nombreUsuarioContainer = document.getElementById("nombreUsuarioContainer");
              nombreUsuarioContainer.textContent = nombreUsuario;

              var fotoPerfil = document.getElementById("fotoPerfil");
              var saludoElement = document.querySelector(".saludo");
              if (nombreUsuario === "Julio") {
                  fotoPerfil.src = "foto-perfil.png";
                  fotoPerfil.style.opacity = "1";
                  saludoElement.textContent = "Bienvenido";
              } else if (nombreUsuario === "Oscar") {
                  fotoPerfil.src = "foto-perfil-2.png";
                  fotoPerfil.style.opacity = "1";
                  saludoElement.textContent = "Bienvenido";
              }
          } else {
              alert("Nombre de usuario incorrecto. Por favor, inténtelo nuevamente.");
          }
      } else {
          alert("Debe ingresar un nombre de usuario válido. Por favor, inténtelo nuevamente.");
      }
  }
  }
}

function transparente(){
  var fotoPerfilElement = document.getElementById("fotoPerfil");
  fotoPerfilElement.style.opacity = "0";
  var saludoElement = document.querySelector(".saludo");
    saludoElement.textContent = "Iniciar sesión";
}

function obtenerTiempo(ciudad) {
  const apiKey = 'd255db7a1c140565c6e7f0a75ad5e944'; // Reemplaza "TU_API_KEY" con tu propia clave de API de OpenWeatherMap
  
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${apiKey}&lang=es&units=metric`;
  
  fetch(apiUrl)
  .then(res => res.json())
  .then(data => {
      console.log(data);
      // Acceder a los datos meteorológicos
      var temperatura = data.main.temp;
      var descripcion = data.weather[0].description;
      var tempMax = data.main.temp_max;
      var tempMin = data.main.temp_min;
      
      // Actualizar el contenido HTML del elemento con la información del tiempo
      var contenidoElemento = document.querySelector('.contenido');
      contenidoElemento.innerHTML = `<div class="linea-1">La temperatura actual en ${ciudad} es de ${temperatura}°C. El clima es ${descripcion}.</div><div class="linea-2">La temperatura mínima es ${tempMin}°C y la máxima es de ${tempMax}°C</div>`;
  })
  .catch(error => {
      console.log("Error al obtener los datos meteorológicos:", error);
  });
}
