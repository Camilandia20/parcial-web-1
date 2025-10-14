const searchInput = document.getElementById('searchInput');
const regionSelect = document.getElementById('regionSelect');
const countriesContainer = document.getElementById('countriesContainer');
const noResults = document.getElementById('noResults');

let allCountries = [];

function fetchCountries() {
  fetch('https://api.worldbank.org/v2/country?format=json')
    .then(response => response.json())
    .then(data => {
      allCountries = data[1];
      displayCountries(allCountries);
    })
    .catch(error => {
      console.error('Error al cargar países:', error);
      countriesContainer.innerHTML = '<p>Error cargando países.</p>';
    });
}

function displayCountries(countries) {
  countriesContainer.innerHTML = '';

  if (countries.length === 0) {
    noResults.classList.remove('hidden');
    return;
  }

  noResults.classList.add('hidden');

  countries.forEach(country => {
    const name = country.name || 'Sin nombre';
    const capital = country.capitalCity || 'Sin capital';
    const region = country.region.value || 'Desconocida';
    const incomeLevel = country.incomeLevel.value || 'Desconocido';
    const lendingType = country.lendingType.value || 'Desconocido';
    const lat = country.latitude || 'Desconocido';
    const lon = country.longitude || 'Desconocido';
    const isoCode = country.iso2Code ? country.iso2Code.toLowerCase() : 'xx';
    const population = "No disponible";

    const flagUrl = `https://flagcdn.com/w320/${isoCode}.png`;

    const card = document.createElement('div');
    card.classList.add('country-card');

    card.innerHTML = `<img src="${flagUrl}" alt="Bandera de ${name}" onerror="this.src='https://via.placeholder.com/300x150?text=Sin+bandera'" />
      <div class="country-info">
        <h3>${name}</h3>
        <p>Capital: ${capital}</p>
        <p>Región: ${region}</p>
        <p>Población: ${population}</p>
        <p>Ingreso: ${incomeLevel}</p>
        <p>Préstamo: ${lendingType}</p>
        <p>Lat/Lon: ${lat}, ${lon}</p>
      </div> `;

    countriesContainer.appendChild(card);
  });
}

function applyFilters() {
  const searchText = searchInput.value.toLowerCase();
  const selectedRegion = regionSelect.value;

  const filtered = allCountries.filter(country => {
    const name = (country.name || '').toLowerCase();
    const matchesName = name.includes(searchText);
    const matchesRegion = selectedRegion === '' || country.region.id === selectedRegion;
    return matchesName && matchesRegion;
  });

  displayCountries(filtered);
}

searchInput.addEventListener('input', applyFilters);
regionSelect.addEventListener('change', applyFilters);

fetchCountries();
