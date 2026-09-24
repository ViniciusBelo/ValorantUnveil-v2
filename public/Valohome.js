const API_BASE_URL = '/users';

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

// ─── Dados locais dos agentes (id e imagem) ───
const agentsData = [
    { id: 1,  name: "Jett",      imageUrl: "img/Jett_Artwork_Full.png" },
    { id: 2,  name: "Breach",    imageUrl: "img/Breach_Artwork_Full.png" },
    { id: 3,  name: "Omen",      imageUrl: "img/Omen_Artwork_Full.png" },
    { id: 4,  name: "Brimstone", imageUrl: "img/Brimstone_Artwork_Full.png" },
    { id: 5,  name: "Phoenix",   imageUrl: "img/Phoenix_Artwork_Full.png" },
    { id: 6,  name: "Sage",      imageUrl: "img/Sage_Artwork_Full.png" },
    { id: 7,  name: "Sova",      imageUrl: "img/Sova_Artwork_Full.png" },
    { id: 8,  name: "Viper",     imageUrl: "img/Viper_Artwork_Full.png" },
    { id: 9,  name: "Clove",     imageUrl: "img/Clove_Artwork_Full.png" },
    { id: 10, name: "Raze",      imageUrl: "img/Raze_Artwork_Full.png" },
    { id: 11, name: "Cypher",    imageUrl: "img/Cypher_Artwork_Full.png" },
    { id: 12, name: "Killjoy",   imageUrl: "img/Killjoy_Artwork_Full.png" },
];

// ─── Cria os cards dos agentes ───
function createAgentCards() {
    const container = document.getElementById('agents-container');
    if (!container) return; // página não tem o container (ex: Home)

    agentsData.forEach(agent => {
        const card = document.createElement('div');
        card.classList.add('card');

        const img = document.createElement('img');
        img.src = agent.imageUrl;
        img.alt = agent.name;

        const nameLabel = document.createElement('div');
        nameLabel.classList.add('card-name');
        nameLabel.textContent = agent.name;

        card.appendChild(img);
        card.appendChild(nameLabel);
        card.addEventListener('click', () => fetchAgentInfo(agent.id, agent.imageUrl));
        container.appendChild(card);
    });
}

// ─── Busca detalhes do agente na API ───
function fetchAgentInfo(agentId, imageUrl) {
    const loading = document.getElementById('loading');
    if (loading) loading.style.display = 'flex';

    fetch(`${API_BASE_URL}/${agentId}`)
        .then(response => {
            if (!response.ok) throw new Error('Agente não encontrado');
            return response.json();
        })
        .then(agent => displayAgentInfo(agent, imageUrl))
        .catch(error => {
            console.error('Erro ao buscar agente:', error);
            alert('Não foi possível carregar as informações do agente. Verifique se o servidor está rodando.');
        })
        .finally(() => {
            if (loading) loading.style.display = 'none';
        });
}

// ─── Exibe o modal com informações do agente ───
function displayAgentInfo(agent, imageUrl) {
    const modal    = document.getElementById('agent-info-modal');
    const imgEl    = document.getElementById('modal-agent-img');
    const nameEl   = document.getElementById('modal-agent-name');
    const classeEl = document.getElementById('modal-agent-classe');
    const bioEl    = document.getElementById('modal-agent-bio');
    const closeBtn = document.querySelector('.close');

    imgEl.src        = imageUrl || '';
    imgEl.alt        = agent.name;
    nameEl.textContent   = agent.name;
    classeEl.textContent = agent.classe;
    bioEl.textContent    = agent.bio;

    modal.style.display = 'flex';
    modal.style.alignItems = 'center';

    function closeModal() {
        modal.style.display = 'none';
    }

    // { once: true } garante que o listener não se acumula a cada abertura
    closeBtn.addEventListener('click', closeModal, { once: true });
    modal.addEventListener('click', function (event) {
        if (event.target === modal) closeModal();
    }, { once: true });
}

window.onload = createAgentCards;
