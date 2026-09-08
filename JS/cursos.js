const ICON = {
  music:'<path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>',
};

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

const GLOWS = [
  "radial-gradient(circle at 25% 15%,rgba(61,139,255,.4),transparent 55%),linear-gradient(165deg,#173456,#0B1A2C)",
  "radial-gradient(circle at 75% 12%,rgba(92,211,232,.32),transparent 55%),linear-gradient(165deg,#123049,#081625)",
  "radial-gradient(circle at 50% 8%,rgba(61,139,255,.35),transparent 55%),linear-gradient(165deg,#1B3A5F,#0A1B2E)",
  "radial-gradient(circle at 30% 20%,rgba(240,169,59,.22),transparent 55%),linear-gradient(165deg,#173456,#0B1A2C)",
  "radial-gradient(circle at 70% 15%,rgba(92,211,232,.3),transparent 55%),linear-gradient(165deg,#123049,#081625)",
  "radial-gradient(circle at 40% 10%,rgba(61,139,255,.3),transparent 55%),linear-gradient(165deg,#1B3A5F,#0A1B2E)",
  "radial-gradient(circle at 60% 18%,rgba(92,211,232,.28),transparent 55%),linear-gradient(165deg,#173456,#0B1A2C)",
  "radial-gradient(circle at 35% 12%,rgba(240,169,59,.2),transparent 55%),linear-gradient(165deg,#123049,#081625)",
  "radial-gradient(circle at 55% 14%,rgba(61,139,255,.32),transparent 55%),linear-gradient(165deg,#1B3A5F,#0A1B2E)",
];

let active = "all", query = "", errorOn = false;

function card(c, i) {
  return `
    <article
      data-idx="${i}"
      class="curso-card group relative h-[360px] cursor-pointer overflow-hidden rounded-[20px] bg-brand-card transition-transform duration-300 hover:-translate-y-2 hover:shadow-[0_28px_50px_rgba(14,27,46,.28)]">

      <div class="absolute inset-0" style="background:${GLOWS[i % 9]}"></div>

      <div class="absolute inset-0">
        <img
          src="${c.imagen}"
          alt="${c.nombre}"
          class="h-full w-full object-cover">
      </div>

      ${c.popular ? `
        <span class="absolute left-4 top-4 z-[2] rounded-full bg-brand-amber px-[11px] py-1.5 text-[0.63rem] font-extrabold uppercase tracking-wide text-void">
          Popular
        </span>
      ` : ""}

      <span class="absolute right-4 top-4 z-[2] flex items-center gap-1.5 rounded-full border border-white/20 bg-void/50 px-3 py-1.5 text-[0.65rem] font-bold uppercase tracking-wide text-white backdrop-blur-sm">
        <span class="h-1.5 w-1.5 rounded-full bg-brand-cyan"></span>
        ${c.nivel}
      </span>

      <div class="absolute inset-x-[22px] bottom-5 z-[2] text-white">

        <h3 class="mb-1.5 font-serif text-[1.24rem] font-semibold leading-[1.28]">
          ${c.nombre}
        </h3>

        <p class="mb-2.5 text-[0.78rem] text-white/60">
          Por ${c.instructor}
        </p>

        <div class="flex gap-3.5 text-[0.74rem] text-white/55">
          <span>${c.horas} horas</span>
          <span>${c.lecciones} lecciones</span>
        </div>

      </div>

    </article>
  `;
}

function seleccionarCurso(idx) {
  const curso = CURSOS[idx];
  localStorage.setItem("cursoSeleccionado", JSON.stringify(curso));
  window.location.href = "desCurso.html";
}

function render() {
  const grid = document.getElementById("grid");
  const empty = document.getElementById("empty");
  const list = errorOn ? [] : CURSOS.filter(c => {
    const f = active === "all" || (active === "mine" && c.mio) || (active === "popular" && c.popular);
    const q = !query || c.nombre.toLowerCase().includes(query) || c.instructor.toLowerCase().includes(query);
    return f && q;
  });
  document.getElementById("alert").classList.toggle("hidden", !errorOn);

  if (list.length) {
    grid.innerHTML = list.map(c => card(c, CURSOS.indexOf(c))).join("");
    grid.classList.remove("hidden"); empty.classList.add("hidden"); empty.classList.remove("flex");

    grid.querySelectorAll(".curso-card").forEach(el => {
      el.addEventListener("click", () => seleccionarCurso(Number(el.dataset.idx)));
    });
  } else {
    grid.classList.add("hidden");
    if (!errorOn) {
      const mine = active === "mine";
      document.getElementById("empty-title").textContent = mine ? "Todavía no tienes cursos" : "No encontramos cursos";
      document.getElementById("empty-text").textContent = mine
        ? 'Cuando empieces uno desde "Todos los cursos", aparecerá aquí junto con tu progreso.'
        : "Prueba con otro término de búsqueda o cambia el filtro seleccionado.";
      empty.classList.remove("hidden"); empty.classList.add("flex");
    } else { empty.classList.add("hidden"); empty.classList.remove("flex"); }
  }
}

document.getElementById("filters").addEventListener("click", e => {
  const btn = e.target.closest(".filter-btn"); if (!btn) return;
  active = btn.dataset.filter;
  document.querySelectorAll(".filter-btn").forEach(b => {
    const on = b === btn;
    b.classList.toggle("bg-navy", on); b.classList.toggle("text-white", on);
    b.classList.toggle("text-brand-ink/50", !on); b.classList.toggle("hover:bg-brand-blue/10", !on);
  });
  render();
});
document.getElementById("search").addEventListener("input", e => { query = e.target.value.toLowerCase(); render(); });
function setError(v){ errorOn = (v===undefined) ? !errorOn : v; render(); }
function resetFilters(){ active="all"; query=""; document.getElementById("search").value=""; document.querySelector('[data-filter="all"]').click(); }
render();