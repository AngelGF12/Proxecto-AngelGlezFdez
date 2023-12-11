document.addEventListener('DOMContentLoaded', function () {
    const apiKey = '3f46c2d81e224b1d898b76fbe147eaa6';
    const newsApiUrl = `https://newsapi.org/v2/everything?q=videojuegos&apiKey=${apiKey}`;

    fetch(newsApiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error de la API: ${response.status} - ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            const newsSection = document.getElementById('newsSection');
            data.articles.forEach(article => {
                const articleElement = document.createElement('article');
                const titleElement = document.createElement('h2');
                const descriptionElement = document.createElement('p');

                titleElement.textContent = article.title;
                descriptionElement.textContent = article.description;

                articleElement.appendChild(titleElement);
                articleElement.appendChild(descriptionElement);
                newsSection.appendChild(articleElement);
            });
        })
        .catch(error => console.error('Error al obtener noticias:', error));
});

document.addEventListener('DOMContentLoaded', function () {
        const formulario = document.querySelector('form');
        const mensajeError = document.getElementById('mensajeError');

        formulario.addEventListener('submit', function (event) {
            event.preventDefault();
            validarFormulario();
        });

        function validarFormulario() {
            const nombre = document.getElementById('nombre').value;
            const usuario = document.getElementById('usuario').value;
            const correo = document.getElementById('correo').value;
            const contrasena = document.getElementById('contrasena').value;
            const aceptaBases = document.getElementById('aceptaBases');
            const aceptaComunicaciones = document.getElementById('aceptaComunicaciones');

            mensajeError.innerHTML = '';

            if (!nombre) {
                mensajeError.innerHTML += 'Nombre es un campo requerido.<br>';
            }

            if (!usuario) {
                mensajeError.innerHTML += 'Usuario es un campo requerido.<br>';
            }

            if (!correo || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)) {
                mensajeError.innerHTML += 'Correo electrónico inválido.<br>';
            }

            if (!contrasena || !/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}/.test(contrasena)) {
                mensajeError.innerHTML += 'Contraseña inválida. Debe contener al menos una minúscula, una mayúscula, un dígito y un carácter especial, y tener una longitud entre 8 y 20 caracteres.<br>';
            }

            if (!aceptaBases.checked) {
                mensajeError.innerHTML += 'Debes aceptar las bases legales, términos y condiciones.<br>';
            }
        }
});