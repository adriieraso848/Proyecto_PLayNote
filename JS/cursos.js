const CURSOS = [
  {
    nombre: "Violín: Técnica y Expresión",
    instructor: "Laura Martínez",
    imagen: "img/violin.jpg",
    horas: 11,
    lecciones: 30,
    nivel: "Intermedio",
    popular: true,
    mio: false
  },

  {
    nombre: "Guitarra: Básico en Guitarra",
    instructor: "Alejandro Sans",
    imagen: "img/guitarra1.jpg",
    horas: 18,
    lecciones: 40,
    nivel: "Principiante",
    popular: true,
    mio: false
  },

  {
    nombre: "Piano: Técnica y Expresión",
    instructor: "Miguel Arango",
    imagen: "img/piano.jpg",
    horas: 15,
    lecciones: 35,
    nivel: "Intermedio",
    popular: true,
    mio: false
  },

  {
    nombre: "Batería: Ritmo desde Cero",
    instructor: "Carlos Peña",
    imagen: "img/bateria.jpg",
    horas: 13,
    lecciones: 28,
    nivel: "Principiante",
    popular: false,
    mio: false
  },

  {
    nombre: "Canto: Técnica Vocal Moderna",
    instructor: "Sofía Reyes",
    imagen: "img/canto.jpg",
    horas: 9,
    lecciones: 22,
    nivel: "Intermedio",
    popular: true,
    mio: true
  },

  {
    nombre: "Saxofón: Jazz y Blues",
    instructor: "Daniel Ortiz",
    imagen: "img/saxofon.jpg",
    horas: 16,
    lecciones: 32,
    nivel: "Avanzado",
    popular: false,
    mio: false
  },

  {
    nombre: "Flauta Traversa: Sonido y Respiración",
    instructor: "Camila Rojas",
    imagen: "img/flauta.jpg",
    horas: 10,
    lecciones: 24,
    nivel: "Principiante",
    popular: false,
    mio: false
  },

  {
    nombre: "Bajo Eléctrico: Groove Esencial",
    instructor: "Andrés Gómez",
    imagen: "img/bajo.jpg",
    horas: 14,
    lecciones: 29,
    nivel: "Intermedio",
    popular: false,
    mio: false
  },

  {
    nombre: "Ukelele: Acordes y Canciones",
    instructor: "Valentina Cruz",
    imagen: "img/ukelele.jpg",
    horas: 7,
    lecciones: 18,
    nivel: "Principiante",
    popular: true,
    mio: false
  }
];
let filtro = "all";
function mostrarCursos(lista) {
  const grid = document.getElementById("grid");
  grid.innerHTML = "";
  for (let i = 0; i < lista.length; i++) {
    grid.innerHTML += `
      <article
        data-idx="${i}"
        class="curso-card group relative h-[360px] cursor-pointer overflow-hidden rounded-[20px] bg-brand-card transition-transform duration-300 hover:-translate-y-2">
        <img
          src="${lista[i].imagen}"
          alt="${lista[i].nombre}"
          class="h-full w-full object-cover">
        <div class="absolute inset-x-[22px] bottom-5 text-white">
          <h3 class="mb-1.5 font-serif text-[1.24rem] font-semibold leading-[1.28]">
            ${lista[i].nombre}
          </h3>
          <p class="mb-2.5 text-[0.78rem] text-white/60">
            Por ${lista[i].instructor}
          </p>
          <div class="flex gap-3.5 text-[0.74rem] text-white/55">
            <span>${lista[i].horas} horas</span>
            <span>${lista[i].lecciones} lecciones</span>
          </div>
        </div>
      </article>
    `;
  }
  const tarjetas = document.querySelectorAll(".curso-card");
  for (let i = 0; i < tarjetas.length; i++) {
    tarjetas[i].addEventListener("click", function() {
      const curso = lista[i];
      localStorage.setItem(
        "cursoSeleccionado",
        JSON.stringify(curso)
      );
      window.location.href = "desCurso.html";
    });
  }
}
document.getElementById("filters").addEventListener("click", function(event) {
  const boton = event.target.closest(".filter-btn");
  if (!boton) {
    return;
  }
  filtro = boton.dataset.filter;
  let lista = CURSOS;
  if (filtro == "all") {
    lista = CURSOS;
  }
  if (filtro == "mine") {
    lista = CURSOS.filter(function(curso) {
      return curso.mio == true;
    });
  }
  if (filtro == "popular") {
    lista = CURSOS.filter(function(curso) {
      return curso.popular == true;
    });
  }
  mostrarCursos(lista);
});
document.getElementById("search").addEventListener("input", function() {
  const texto = document.getElementById("search").value;
  let lista = CURSOS;
  if (filtro == "mine") {
    lista = CURSOS.filter(function(curso) {
      return curso.mio == true;
    });
  }
  if (filtro == "popular") {
    lista = CURSOS.filter(function(curso) {
      return curso.popular == true;
    });
  }
  let resultado = [];
  for (let i = 0; i < lista.length; i++) {
    if (
      lista[i].nombre.includes(texto) ||
      lista[i].instructor.includes(texto)
    ) {
      resultado.push(lista[i]);
    }
  }
  if (resultado.length == 0) {
    Swal.fire({
      icon: "warning",
      title: "No encontramos cursos",
      text: "Prueba con otro término de búsqueda.",
      confirmButtonText: "Aceptar"
    });
  } else {
    mostrarCursos(resultado);
  }
});
function mostrarAlerta() {
  Swal.fire({
    icon: "error",
    title: "No se pudo cargar el catálogo",
    text: "La información recibida no tiene un formato válido.",
    confirmButtonText: "Reintentar"
  });
}
function resetFilters() {
  filtro = "all";
  document.getElementById("search").value = "";
  mostrarCursos(CURSOS);
}
mostrarCursos(CURSOS);
mostrarAlerta();