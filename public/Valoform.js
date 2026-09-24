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

// ─── Envio do formulário ───
document.getElementById('agentForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const submitBtn = document.getElementById('submit-btn');
    const feedback  = document.getElementById('form-feedback');

    const agent = {
        name:   document.getElementById('name').value.trim(),
        classe: document.getElementById('classe').value.trim(),
        bio:    document.getElementById('bio').value.trim(),
    };

    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="bi bi-hourglass-split"></i> Enviando...';
    feedback.style.display = 'none';

    fetch(API_BASE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(agent),
    })
    .then(response => {
        if (!response.ok) throw new Error('Erro ao adicionar agente');
        return response.json();
    })
    .then(() => {
        feedback.className = 'form-feedback success';
        feedback.innerHTML = '<i class="bi bi-check-circle"></i> Agente adicionado com sucesso!';
        feedback.style.display = 'block';
        document.getElementById('agentForm').reset();
    })
    .catch(() => {
        feedback.className = 'form-feedback error';
        feedback.innerHTML = '<i class="bi bi-exclamation-triangle"></i> Erro ao adicionar o agente. Tente novamente.';
        feedback.style.display = 'block';
    })
    .finally(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<i class="bi bi-plus-circle"></i> Adicionar Agente';
    });
});
