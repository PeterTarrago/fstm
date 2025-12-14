const formulario = document.getElementById('formulario-contacto');

    formulario.addEventListener('submit', function(evento) {
        evento.preventDefault();
        evento.stopPropagation();

        let formularioValido = true;


        const nombreInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const mensajeInput = document.getElementById('message');
        

        const radios = document.getElementsByName('tipo_usuario');
        const errorRadio = document.getElementById('error-radio');
        let radioSeleccionado = false;

        for (let i = 0; i < radios.length; i++) {
            if (radios[i].checked) {
                radioSeleccionado = true;
                break;
            }
        }


        if (nombreInput.value.trim() === '') {
            mostrarError(nombreInput);
            formularioValido = false;
        } else {
            quitarError(nombreInput);
        }


        if (!esEmailValido(emailInput.value)) {
            mostrarError(emailInput);
            formularioValido = false;
        } else {
            quitarError(emailInput);
        }

        if (!radioSeleccionado) {
            errorRadio.style.display = 'block'; 
            formularioValido = false;
        } else {
            errorRadio.style.display = 'none';
        }


        if (mensajeInput.value.trim() === '') {
            mostrarError(mensajeInput);
            formularioValido = false;
        } else {
            quitarError(mensajeInput);
        }


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
