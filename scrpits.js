document.getElementById('disculpaForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const nombre = document.getElementById('nombre').value;
    const mensaje = document.getElementById('mensaje').value;
    const mensajeLargo = document.getElementById('mensajeLarge').value;

    // Crear un enlace único para la disculpa
    const link = `perdon.html?nombre=${encodeURIComponent(nombre)}&mensaje=${encodeURIComponent(mensaje)}&mensajeLargo=${encodeURIComponent(mensajeLargo)}`;
    
    // Mostrar el link generado
    const linkContainer = document.createElement('div');
    linkContainer.innerHTML = `
        <p>Tu link ha sido generado:</p>
        <a href="${link}" target="_blank">${window.location.origin}/${link}</a>
    `;
    document.querySelector('.container').innerHTML = '';
    document.querySelector('.container').appendChild(linkContainer);
});
