// ================================
// SISTEMA DE INSCRIPCIONES
// ================================

// Obtener elementos del HTML
const nombre = document.getElementById("nombre");
const apellido = document.getElementById("apellido");
const codigo = document.getElementById("codigo");
const correo = document.getElementById("correo");
const curso = document.getElementById("curso");

const botonInscribirse = document.getElementById("inscribirse");
const botonVerInscripciones = document.getElementById("verInscripciones");
const listaInscripciones = document.getElementById("listaInscripciones");


// ================================
// OBTENER INSCRIPCIONES
// ================================

function obtenerInscripciones() {

    const datos = localStorage.getItem("inscripciones");

    if (datos) {
        return JSON.parse(datos);
    }

    return [];
}


// ================================
// GUARDAR INSCRIPCIONES
// ================================

function guardarInscripciones(inscripciones) {

    localStorage.setItem(
        "inscripciones",
        JSON.stringify(inscripciones)
    );
}


// ================================
// REGISTRAR INSCRIPCIÓN
// ================================

botonInscribirse.addEventListener("click", function () {

    // Validar campos
    if (
        nombre.value.trim() === "" ||
        apellido.value.trim() === "" ||
        codigo.value.trim() === "" ||
        correo.value.trim() === ""
    ) {
        alert("Por favor, completa todos los campos.");
        return;
    }


    // Obtener las inscripciones existentes
    const inscripciones = obtenerInscripciones();


    // Crear nueva inscripción
    const nuevaInscripcion = {

        nombre: nombre.value.trim(),

        apellido: apellido.value.trim(),

        codigo: codigo.value.trim(),

        correo: correo.value.trim(),

        curso: curso.value
    };


    // Agregar inscripción al arreglo
    inscripciones.push(nuevaInscripcion);


    // Guardar en localStorage
    guardarInscripciones(inscripciones);


    // Mostrar mensaje
    alert("¡Inscripción realizada con éxito!");


    // Limpiar los campos
    nombre.value = "";
    apellido.value = "";
    codigo.value = "";
    correo.value = "";


    // Mostrar las inscripciones actualizadas
    mostrarInscripciones();

});


// ================================
// MOSTRAR INSCRIPCIONES
// ================================

function mostrarInscripciones() {

    // Limpiar el contenido anterior
    listaInscripciones.innerHTML = "";


    // Obtener datos de localStorage
    const inscripciones = obtenerInscripciones();


    // Si no existen inscripciones
    if (inscripciones.length === 0) {

        listaInscripciones.innerHTML =
            "<p class='text-gray-300'>No hay inscripciones registradas.</p>";

        return;
    }


    // Título
    const titulo = document.createElement("h3");

    titulo.textContent = "Mis inscripciones";

    titulo.className =
        "text-2xl font-bold text-white mb-4";


    listaInscripciones.appendChild(titulo);


    // Recorrer las inscripciones
    inscripciones.forEach(function (inscripcion, indice) {

        // Crear tarjeta
        const tarjeta = document.createElement("div");


        tarjeta.className =
            "bg-slate-700 rounded-xl p-5 mb-4 text-white";


        // Crear contenido
        tarjeta.innerHTML = `
            <p><strong>Estudiante:</strong> 
                ${inscripcion.nombre} ${inscripcion.apellido}
            </p>

            <p><strong>Código:</strong> 
                ${inscripcion.codigo}
            </p>

            <p><strong>Correo:</strong> 
                ${inscripcion.correo}
            </p>

            <p><strong>Curso:</strong> 
                ${inscripcion.curso}
            </p>
        `;


        // Agregar tarjeta al contenedor
        listaInscripciones.appendChild(tarjeta);

    });

}


// ================================
// BOTÓN VER INSCRIPCIONES
// ================================

botonVerInscripciones.addEventListener("click", function () {

    mostrarInscripciones();

});