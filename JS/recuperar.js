let botonRestablecer = document.querySelector("#btnRestablecer");

botonRestablecer.addEventListener("click", async ()=> {

    let nuevaContraseña = document.getElementById("nuevaContraseña").value;
    let confirmarContraseña = document.getElementById("confirmarContraseña").value;

    if (nuevaContraseña == "" || confirmarContraseña == "") {
        await Swal.fire({
            title: "Campos vacíos",
            text: "Completa todos los campos",
            icon: "warning",
            confirmButtonText: "Aceptar"
        });
    }

    else if (nuevaContraseña != confirmarContraseña) {
        await Swal.fire({
            title: "Error",
            text: "Las contraseñas no coinciden",
            icon: "error",
            confirmButtonText: "Aceptar"
        });
    }

    else {

        let usuarios = JSON.parse(localStorage.getItem("usuarios"));

        if (usuarios == null) {
            await Swal.fire({
                title: "Error",
                text: "No hay usuarios registrados",
                icon: "error",
                confirmButtonText: "Aceptar"
            });
        }

        else {

            // Muestra una alerta personalizada para solicitar el correo del usuario
            // y detiene el proceso si el usuario pulsa “Cancelar”.
            let resultado = await Swal.fire({
                title: "Restablecer contraseña",
                text: "Escribe el correo de tu cuenta",
                input: "email",
                inputPlaceholder: "correo@ejemplo.com",
                icon: "question",
                showCancelButton: true,
                confirmButtonText: "Continuar",
                cancelButtonText: "Cancelar"
            });

            if (!resultado.isConfirmed) {
                return;
            }

            let correo = resultado.value;





            let usuarioEncontrado = null;

            // Recorre todos los usuarios para buscar uno con el correo indicado
            for (let i = 0; i < usuarios.length; i++) {

                if (usuarios[i].correo == correo) {
                    usuarioEncontrado = usuarios[i];
                }
            }

            if (usuarioEncontrado == null) {
                await Swal.fire({
                    title: "Correo no encontrado",
                    text: "El correo no está registrado",
                    icon: "error",
                    confirmButtonText: "Aceptar"
                });
            }

            else {

                // Cambia la contraseña del usuario encontrado
                usuarioEncontrado.contraseña = nuevaContraseña;

                // Guarda la lista actualizada de usuarios en localStorage
                localStorage.setItem("usuarios", JSON.stringify(usuarios));

                await Swal.fire({
                    title: "¡Éxito!",
                    text: "Contraseña restablecida correctamente",
                    icon: "success",
                    confirmButtonText: "Aceptar"
                });
                
                // Envía al usuario a la página de inicio de sesión
                window.location.href = "login.html";
            }
        }
    }
});