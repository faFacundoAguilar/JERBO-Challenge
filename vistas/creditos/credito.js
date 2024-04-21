// Obtener los elementos del DOM
const credits = document.getElementById("credits");
const creditsList = credits.querySelector("ul");
const creditsItems = credits.querySelectorAll("li");

// Establecer la altura de los créditos
credits.style.height = `${creditsList.offsetHeight}px`;

// Animar los créditos
creditsItems.forEach((item, index) => {
  item.style.animationDelay = `${index}s`;
});

// salir 
document.addEventListener('keydown', (event) => {
  if (event.key == 'Escape') {
    window.location.href = '../MenuInicio.html';
  }
});