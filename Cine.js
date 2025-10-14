document.addEventListener('DOMContentLoaded', () => {

    const [formulario, busquedaInput, resultadosDiv, mensajeDiv, contenedor] = [
        'formulario', 'busqueda', 'resultados', 'mensaje'
    ].map(id => document.getElementById(id)).concat(document.querySelector('.contenedor'));

    const API_KEY = '3230f80c';
    const API_URL_BASE = 'https://www.omdbapi.com/';
    const PLACEHOLDER_POSTER = 'https://via.placeholder.com/180x270.png?text=No+Poster';





    async function fetchData(params) {
        const url = `${API_URL_BASE}?apikey=${API_KEY}${params}`;
        const respuesta = await fetch(url);
        return respuesta.json();
    }


    formulario.addEventListener('submit', async (e) => {
        e.preventDefault();
        const busqueda = busquedaInput.value.trim();

        if (!busqueda) {
            return mostrarMensaje('Escribe algo para buscar.', 'alerta');
        }

        mostrarMensaje('Buscando...', 'info');
        resultadosDiv.innerHTML = '';

        try {
            const datos = await fetchData(`&s=${busqueda}`);

            if (datos.Response === "True") {
                mostrarMensaje(''); 
                mostrarPeliculas(datos.Search);
            } else {
                mostrarMensaje('No se encontraron películas con ese nombre.', 'error');
            }
        } catch (error) {
            mostrarMensaje('Error de conexión. Intenta de nuevo.', 'error');
        }
    });



    function mostrarMensaje(mensaje, tipo = '') {
        mensajeDiv.textContent = mensaje;
        mensajeDiv.className = tipo ? `mensaje ${tipo}` : 'mensaje';
    }


    function mostrarPeliculas(peliculas) {
        const fragment = document.createDocumentFragment();

        peliculas.forEach(pelicula => {
            const peliculaDiv = document.createElement('div');
            peliculaDiv.className = 'pelicula';

            const poster = pelicula.Poster === "N/A" ? PLACEHOLDER_POSTER : pelicula.Poster;

            peliculaDiv.innerHTML = `
                <img src="${poster}" alt="Póster de ${pelicula.Title}">
                <p>${pelicula.Title} (${pelicula.Year})</p>
            `;

            peliculaDiv.addEventListener('click', () => obtenerDetalles(pelicula.imdbID));
            fragment.appendChild(peliculaDiv);
        });
        resultadosDiv.appendChild(fragment);
    }


    async function obtenerDetalles(id) {
        mostrarMensaje('Cargando detalles...', 'info');
        try {
            const detalles = await fetchData(`&i=${id}&plot=full`);
            mostrarMensaje('');

            if (detalles.Response === "True") {
                mostrarModal(detalles);
            }
        } catch (error) {
            mostrarMensaje('No se pudieron cargar los detalles.', 'error');
        }
    }

    function mostrarModal(detalles) {
        if (document.querySelector('.modal')) document.querySelector('.modal').remove();

        const modal = document.createElement('div');
        modal.classList.add('modal');
        modal.innerHTML = `
            <div class="modal-contenido">
                <span class="modal-cerrar">&times;</span>
                <h3>${detalles.Title} (${detalles.Year})</h3>
                <p><strong>Género:</strong> ${detalles.Genre}</p>
                <p><strong>Director:</strong> ${detalles.Director}</p>
                <p><strong>Sinopsis:</strong> ${detalles.Plot}</p>
            </div>
        `;

        modal.querySelector('.modal-cerrar').addEventListener('click', () => modal.remove());
        modal.addEventListener('click', (e) => e.target === modal && modal.remove()); // Cerrar al clic fuera

        contenedor.appendChild(modal);
    }
});