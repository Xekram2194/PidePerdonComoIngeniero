async function acortarEnlace(urlLargo) {
    const response = await fetch(`https://api.tinyurl.com/create`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ZxARBTSGy4U4So0kbPLotC6fU0jzHhhfUNkxCB34cFhv2rh9i2CCwuhZMEXl'  // Reemplaza con tu token de TinyURL
        },
        body: JSON.stringify({
            url: urlLargo,
            domain: "tiny.one"
        })
    });
    const data = await response.json();
    return data.data.tiny_url;
};



document.getElementById('disculpaForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    const nombre = document.getElementById('nombre');
    const mensaje = document.getElementById('mensaje');
    const mensajeLargo = document.getElementById('mensajeLarge');

    let valid = true;

    if (nombre.value.trim() === '') {
        nombre.style.borderColor = 'red';
        valid = false;
    } else {
        nombre.style.borderColor = '';
    }

    if (mensaje.value.trim() === '') {
        mensaje.style.borderColor = 'red';
        valid = false;
    } else {
        mensaje.style.borderColor = '';
    }

    if (mensajeLargo.value.trim() === '') {
        mensajeLargo.style.borderColor = 'red';
        valid = false;
    } else {
        mensajeLargo.style.borderColor = '';
    }
    // Solo si todos los campos son válidos, se procede a generar y acortar el enlace
    if (valid) {
        // Crear un enlace único para la disculpa
        const link = `perdon.html?nombre=${encodeURIComponent(nombre.value)}&mensaje=${encodeURIComponent(mensaje.value)}&mensajeLargo=${encodeURIComponent(mensajeLargo.value)}`;
        const shortLink = await acortarEnlace(`${window.location.origin}/${link}`);

        // Mostrar el modal con el enlace generado
        const modal = document.getElementById('modal');
        const modalLink = document.getElementById('modalLink');
        modalLink.href = shortLink;
        modalLink.textContent = shortLink;

        // Mostrar el modal
        modal.style.display = 'block';

        // Copiar el enlace al portapapeles
        document.getElementById('copiarLinkModal').addEventListener('click', function() {
            navigator.clipboard.writeText(shortLink).then(() => {
                alert('Enlace copiado al portapapeles');
            });
        });

        // Cerrar el modal
        document.getElementById('closeModal').addEventListener('click', function() {
            modal.style.display = 'none';
        });

        // Cerrar el modal si se hace clic fuera del contenido del modal
        window.addEventListener('click', function(event) {
            if (event.target == modal) {
                modal.style.display = 'none';
            }
        });
    }
});

