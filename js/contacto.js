const formulario = document.getElementById('formulario-contacto');

    formulario.addEventListener('submit', function(evento) {
        evento.preventDefault();
        evento.stopPropagation();

        let formularioValido = true;

        // Elementos
        const nombreInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const mensajeInput = document.getElementById('message');
        
        // Validación Radio Buttons (Busca si alguno está chequeado)
        const radios = document.getElementsByName('tipo_usuario');
        const errorRadio = document.getElementById('error-radio');
        let radioSeleccionado = false;

        for (let i = 0; i < radios.length; i++) {
            if (radios[i].checked) {
                radioSeleccionado = true;
                break;
            }
        }

        // 1. VALIDAR NOMBRE
        if (nombreInput.value.trim() === '') {
            mostrarError(nombreInput);
            formularioValido = false;
        } else {
            quitarError(nombreInput);
        }

        // 2. VALIDAR EMAIL
        if (!esEmailValido(emailInput.value)) {
            mostrarError(emailInput);
            formularioValido = false;
        } else {
            quitarError(emailInput);
        }

        // 3. VALIDAR RADIO BUTTONS
        if (!radioSeleccionado) {
            errorRadio.style.display = 'block'; // Muestra el mensaje de error rojo
            formularioValido = false;
        } else {
            errorRadio.style.display = 'none';
        }

        // 4. VALIDAR MENSAJE
        if (mensajeInput.value.trim() === '') {
            mostrarError(mensajeInput);
            formularioValido = false;
        } else {
            quitarError(mensajeInput);
        }

        // ENVÍO FINAL
        if (formularioValido) {
            alert('¡Todo correcto! Enviando datos...');
            formulario.submit();
        }
    });

    function esEmailValido(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    function mostrarError(input) {
        input.classList.add('is-invalid');
    }

    function quitarError(input) {
        input.classList.remove('is-invalid');
        input.classList.add('is-valid');
    }
});