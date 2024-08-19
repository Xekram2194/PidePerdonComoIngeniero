async function acortarEnlace(urlLargo) {
    const response = await fetch(`https://api.tinyurl.com/create`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'ZxARBTSGy4U4So0kbPLotC6fU0jzHhhfUNkxCB34cFhv2rh9i2CCwuhZMEXl'  // Reemplaza con tu token de TinyURL
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

    const nombre = document.getElementById('nombre').value;
    const mensaje = document.getElementById('mensaje').value;
    const mensajeLargo = document.getElementById('mensajeLarge').value;

    // Crear un enlace único para la disculpa
    const link = `perdon.html?nombre=${encodeURIComponent(nombre)}&mensaje=${encodeURIComponent(mensaje)}&mensajeLargo=${encodeURIComponent(mensajeLargo)}`;
    
    const shortLink = await acortarEnlace(`${window.location.origin}/${link}`);

    const linkContainer = document.createElement('div');
    linkContainer.innerHTML = `
        <p>Tu link ha sido generado:</p>
        <a href="${shortLink}" target="_blank">${shortLink}</a>
        <button id="copiarLink">Copiar Link</button>
    `;
    document.querySelector('.container').innerHTML = '';
    document.querySelector('.container').appendChild(linkContainer);

    document.getElementById('copiarLink').addEventListener('click', function() {
        navigator.clipboard.writeText(shortLink).then(() => {
            alert('Enlace copiado al portapapeles');
        });
    });
});

