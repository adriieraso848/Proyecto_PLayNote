tailwind.config = {
    theme: {
        extend: {
            fontFamily: {
                display: ['"Fraunces"', 'serif'],
                sans: ['"Work Sans"', 'sans-serif'],
                mono: ['"IBM Plex Mono"', 'monospace'],
            },

            colors: {
                ink: {
                    DEFAULT: '#0F172A',
                    800: '#1E293B'
                },

                brass: {
                    DEFAULT: '#3B82F6',
                    400: '#60A5FA',
                    600: '#2563EB'
                },

                ivory: '#F8FAFC',

                ember: {
                    DEFAULT: '#0EA5E9',
                    600: '#0284C7'
                },

                sage: '#38BDF8',

                charcoal: '#334155'
            }
        }
    }
};


document.addEventListener("DOMContentLoaded", function () {

    let usuariosRegistrados =
        JSON.parse(localStorage.getItem("usuarios")) || [];

    let formulario =
        document.getElementById("form-login");

    let errorCredenciales =
        document.getElementById("error-credenciales");

    let exito =
        document.getElementById("exito-login");


    function mostrarError(input, mensaje) {

        let parrafo =
            input.closest("div").nextElementSibling;

        parrafo.textContent = mensaje;
        parrafo.classList.remove("hidden");
    }


    function limpiarError(input) {

        let parrafo =
            input.closest("div").nextElementSibling;

        parrafo.classList.add("hidden");
    }


    formulario.addEventListener("submit", function (evento) {

        evento.preventDefault();

        errorCredenciales.classList.add("hidden");
        exito.classList.add("hidden");


        let correo =
            document.getElementById("correo");

        let password =
            document.getElementById("password");


        limpiarError(correo);
        limpiarError(password);


        let valido = true;


        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo.value)) {

            mostrarError(correo, "Correo inválido");

            valido = false;
        }


        if (password.value == "") {

            mostrarError(password, "Ingresa tu contraseña");

            valido = false;
        }


        if (valido == false) {
            return;
        }


        let correoIngresado =
            correo.value.trim().toLowerCase();

        let contraseñaIngresada =
            password.value;


        let usuarioActivo = null;


        for (let i = 0; i < usuariosRegistrados.length; i++) {

            if (
                usuariosRegistrados[i].correo.trim().toLowerCase() == correoIngresado &&
                usuariosRegistrados[i].contraseña == contraseñaIngresada
            ) {

                usuarioActivo = usuariosRegistrados[i];

                break;
            }
        }


        if (usuarioActivo == null) {

            errorCredenciales.classList.remove("hidden");

            return;
        }


        localStorage.setItem(
            "usuarioActivo",
            JSON.stringify(usuarioActivo)
        );


        exito.classList.remove("hidden");


        setTimeout(function () {

            window.location.href = "pagCursos.html";

        }, 1200);

    });

});