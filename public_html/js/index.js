//Se agregan las noticias automáticamente usando el siguiente métono de gestión de eventos
document.addEventListener('DOMContentLoaded', function () {
    //Se proporciona la clave de nuestra API y la URL para realizar las peticiones
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
                const imageElement = document.createElement('img');
                const linkElement = document.createElement('a');

                titleElement.textContent = article.title;
                descriptionElement.textContent = article.description;
                imageElement.src = article.urlToImage;
                linkElement.href = article.url;
                linkElement.textContent = 'Leer más';

                articleElement.appendChild(titleElement);
                articleElement.appendChild(imageElement);
                articleElement.appendChild(descriptionElement);
                articleElement.appendChild(linkElement);
                newsSection.appendChild(articleElement);
            });

            //Se aplican estilos adicionales después de agregar todos los elementos
            applyAdditionalStyles();
        })
        .catch(error => console.error('Error al obtener noticias:', error));
});

//Función para aplicar estilos adicionales después de agregar los elementos
function applyAdditionalStyles() {
    const newsArticles = document.querySelectorAll('#newsSection article');
    newsArticles.forEach(article => {
        //Estilos aplicados a los elementos
        article.style.marginBottom = '20px';

        const image = article.querySelector('img');
        if (image) {
            image.style.maxWidth = '50%';
            image.style.height = 'auto';
            image.style.display = 'block';
        }

        const link = article.querySelector('a');
        if (link) {
            link.style.display = 'block';
            link.style.marginTop = '10px';
            link.style.color = '#fff';
            link.style.padding = '8px';
        }
    });
}

//Se comprueba que los datos que se introducen en el formulario de registro sean válidos
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

//Función para mostrar el formulario de nueva conversación/reseña
function mostrarFormulario() {
    var formulario = document.getElementById('commentForm');
    formulario.style.display = formulario.style.display === 'none' ? 'block' : 'none';
}

document.addEventListener("DOMContentLoaded", function () {
    cargarComentarios();
});

//Función para agregar comentarios
function agregarComentario() {
    const usuario = document.getElementById("usuario").value;
    const titulo = document.getElementById("titulo").value;
    const comentario = document.getElementById("comentario").value;

    fetch("agregar_comentario.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `usuario=${usuario}&titulo=${titulo}&comentario=${comentario}`,
    })
        .then((response) => response.json())
        .then(() => cargarComentarios());

    return false;
}

//Función para obtener los comentarios
function cargarComentarios() {
    fetch("obtener_comentarios.php")
        .then((response) => response.json())
        .then((comentarios) => {
            const comentariosHTML = generarHTMLComentarios(comentarios);
            document.getElementById("comentarios").innerHTML = comentariosHTML;
        });
}

function generarHTMLComentarios(comentarios) {
    let html = "";
    comentarios.forEach((comentario) => {
        html += `<div class="comentario">
            <p>${comentario.usuario}</p>
            <p>${comentario.titulo}</p>
            <p>${comentario.comentario}</p>
            <button onclick="eliminarComentario(${comentario.id})">Eliminar</button>
        </div>`;
    });

    return html;
}

//Menú móvil
document.addEventListener('DOMContentLoaded', function () {
    const burgerMenu = document.querySelector('.burger-menu');
    const mobileList = document.querySelector('.mobile-list');

    // Mostrar el menú móvil por defecto
    burgerMenu.classList.add('active');
    mobileList.style.display = 'block';
    
    burgerMenu.addEventListener('click', function () {
        //Alternar la visibilidad del menú móvil
        mobileList.style.display = (mobileList.style.display === 'block') ? 'none' : 'block';
    });
});

//Banner de Cookies
document.addEventListener("DOMContentLoaded", function () {
    const cookieBanner = document.getElementById('cookieBanner');

    if (cookieBanner) {
        if (!localStorage.getItem('cookieConsent')) {
            cookieBanner.style.display = 'block';

            document.getElementById('acceptAllCookies').addEventListener('click', acceptAllCookies);
            document.getElementById('acceptNecessaryCookies').addEventListener('click', acceptNecessaryCookies);
            document.getElementById('rejectAllCookies').addEventListener('click', rejectAllCookies);
        }
    }

    function acceptAllCookies() {
        setCookieConsent(true);
        hideCookieBanner();
    }

    function acceptNecessaryCookies() {
        setCookieConsent(true);
        hideCookieBanner();
    }

    function rejectAllCookies() {
        setCookieConsent(false);
        hideCookieBanner();
    }

    function setCookieConsent(consent) {
        localStorage.setItem('cookieConsent', consent);
        document.location.reload();
    }

    function hideCookieBanner() {
        cookieBanner.style.display = 'none';
    }
});
