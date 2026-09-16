document.addEventListener("DOMContentLoaded", function () {

    let usuariosRegistrados =
        JSON.parse(localStorage.getItem("usuarios")) || [];


    let formulario =
        document.getElementById("form-login");



    formulario.addEventListener("submit", function (evento) {

       
        evento.preventDefault();



        let correo =
            document.getElementById("correo");

   
        let password =
            document.getElementById("password");


  
        let correoIngresado =
            correo.value.trim().toLowerCase();

        let contraseñaIngresada =
            password.value;


        if (correoIngresado == "") {

            Swal.fire({
                icon: "warning",
                title: "Campo obligatorio",
                text: "Ingresa tu correo electrónico.",
                confirmButtonText: "Aceptar"
            });

            return;
        }


      
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correoIngresado)) {

            Swal.fire({
                icon: "error",
                title: "Correo inválido",
                text: "Ingresa un correo electrónico válido.",
                confirmButtonText: "Aceptar"
            });

            return;
        }


   
        if (contraseñaIngresada == "") {

            Swal.fire({
                icon: "warning",
                title: "Contraseña requerida",
                text: "Ingresa tu contraseña.",
                confirmButtonText: "Aceptar"
            });

            return;
        }


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

            Swal.fire({
                icon: "error",
                title: "Inicio de sesión fallido",
                text: "El correo o la contraseña no coinciden con ninguna cuenta registrada.",
                confirmButtonText: "Intentar nuevamente"
            });

            return;
        }


     
        localStorage.setItem(
            "usuarioActivo",
            JSON.stringify(usuarioActivo)
        );



        Swal.fire({
            icon: "success",
            title: "¡Bienvenido!",
            text: "Inicio de sesión exitoso.",
            showConfirmButton: false,
            timer: 1200
        });


        setTimeout(function () {

            window.location.href = "pagCursos.html";

        }, 1200);

    });

});