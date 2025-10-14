document.getElementById('searchForm').addEventListener('submit', function(evento) {
    evento.preventDefault();
    let nombreArtista = document.getElementById('searchInput').value.trim();
    if (!nombreArtista) return;

    fetch(`https://musicbrainz.org/ws/2/artist/?query=artist:${encodeURIComponent(nombreArtista)}&fmt=json`)
        .then(respuesta => respuesta.json())
        .then(datos => {
            let resultados = document.getElementById('results');
            resultados.innerHTML = '';
            if (datos.artists && datos.artists.length > 0) {
                let artista = datos.artists[0];
                let pais = artista.country || 'Desconocido';
                let genero = (artista.tags && artista.tags.length > 0) ? artista.tags[0].name : 'Desconocido';
                let tarjeta = document.createElement('div');
                tarjeta.innerHTML = `
                    <h2>${artista.name}</h2>
                    <p><strong>País:</strong> ${pais}</p>
                    <p><strong>Género musical:</strong> ${genero}</p>
                    <h3>Álbumes:</h3>
                    <ul id="listaAlbumes"><li>Cargando álbumes...</li></ul>
                `;
                resultados.appendChild(tarjeta);

                fetch(`https://musicbrainz.org/ws/2/release-group?artist=${artista.id}&type=album&fmt=json`)
                    .then(respuestaAlbumes => respuestaAlbumes.json())
                    .then(datosAlbumes => {
                        let listaAlbumes = tarjeta.querySelector('#listaAlbumes');
                        listaAlbumes.innerHTML = '';
                        if (datosAlbumes['release-groups'] && datosAlbumes['release-groups'].length > 0) {
                            datosAlbumes['release-groups'].forEach(album => {
                                let año = album['first-release-date'] ? album['first-release-date'].substring(0,4) : 'Año desconocido';
                                let elemento = document.createElement('li');
                                elemento.textContent = `${album.title} (${año})`;
                                listaAlbumes.appendChild(elemento);
                            });
                        } else {
                            listaAlbumes.innerHTML = '<li>No se encontraron álbumes.</li>';
                        }
                    })
                    .catch(() => {
                        tarjeta.querySelector('#listaAlbumes').innerHTML = '<li>Error al cargar los álbumes.</li>';
                    });
            } else {
                resultados.innerHTML = '<p>No se encontró el artista.</p>';
            }
        })
        .catch(() => {
            document.getElementById('results').innerHTML = '<p>Error al buscar el artista.</p>';
        });
});