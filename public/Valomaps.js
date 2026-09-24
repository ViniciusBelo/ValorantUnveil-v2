const MAPS_API_URL = 'https://valorant-api.com/v1/maps?language=pt-BR';

// ─── Sidebar ───
var menuItem = document.querySelectorAll('.item-menu');
function selectLink() {
    menuItem.forEach((item) => item.classList.remove('ativo'));
    this.classList.add('ativo');
}
menuItem.forEach((item) => item.addEventListener('click', selectLink));

var btnExp = document.querySelector('#btn-exp');
var menuSide = document.querySelector('.menu-lateral');
btnExp.addEventListener('click', function () {
    menuSide.classList.toggle('expandir');
    document.body.classList.toggle('sidebar-open');
});

// ─── Carrega mapas da API pública do Valorant ───
async function loadMaps() {
    const container = document.getElementById('maps-container');
    const loading   = document.getElementById('loading');
    loading.style.display = 'flex';

    try {
        const response = await fetch(MAPS_API_URL);
        if (!response.ok) throw new Error('Erro na requisição');
        const data = await response.json();

        // Filtra apenas mapas jogáveis (que têm descrição tática)
        const playable = data.data.filter(m => m.tacticalDescription && m.splash);

        if (playable.length === 0) throw new Error('Nenhum mapa encontrado');

        playable.forEach(map => createMapCard(map, container));
    } catch (err) {
        container.innerHTML = `
            <div class="error-msg">
                <i class="bi bi-exclamation-triangle"></i>
                <p>Não foi possível carregar os mapas.<br>Verifique sua conexão com a internet.</p>
            </div>`;
    } finally {
        loading.style.display = 'none';
    }
}

// ─── Cria card de mapa ───
function createMapCard(map, container) {
    const card = document.createElement('div');
    card.classList.add('map-card');
    card.style.backgroundImage = `url('${map.splash}')`;

    card.innerHTML = `
        <div class="map-card-overlay">
            <h3 class="map-card-name">${map.displayName}</h3>
            <span class="map-card-location">
                <i class="bi bi-geo-alt-fill"></i> ${map.coordinates || 'Localização desconhecida'}
            </span>
        </div>`;

    card.addEventListener('click', () => showMapModal(map));
    container.appendChild(card);
}

// ─── Exibe modal com detalhes do mapa ───
function showMapModal(map) {
    const modal = document.getElementById('map-modal');

    document.getElementById('modal-map-img').src        = map.splash;
    document.getElementById('modal-map-img').alt        = map.displayName;
    document.getElementById('modal-map-name').textContent     = map.displayName;
    document.getElementById('modal-map-location').textContent = map.coordinates || 'Desconhecida';
    document.getElementById('modal-map-description').textContent = map.narrativeDescription || '';

    const tacticalEl   = document.getElementById('modal-map-tactical');
    const tacticalWrap = document.getElementById('modal-map-tactical-wrap');
    if (map.tacticalDescription) {
        tacticalEl.textContent    = map.tacticalDescription;
        tacticalWrap.style.display = 'block';
    } else {
        tacticalWrap.style.display = 'none';
    }

    const calloutsEl   = document.getElementById('modal-map-callouts');
    const calloutsWrap = document.getElementById('modal-map-callouts-wrap');
    calloutsEl.innerHTML = '';

    if (map.callouts && map.callouts.length > 0) {
        const regioes = [...new Set(map.callouts.map(c => c.regionName))].slice(0, 16);
        regioes.forEach(regiao => {
            const tag = document.createElement('span');
            tag.classList.add('callout-tag');
            tag.textContent = regiao;
            calloutsEl.appendChild(tag);
        });
        calloutsWrap.style.display = 'block';
    } else {
        calloutsWrap.style.display = 'none';
    }

    modal.style.display = 'flex';

    document.querySelector('.map-close').addEventListener('click', () => {
        modal.style.display = 'none';
    }, { once: true });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.style.display = 'none';
    }, { once: true });
}

window.onload = loadMaps;
