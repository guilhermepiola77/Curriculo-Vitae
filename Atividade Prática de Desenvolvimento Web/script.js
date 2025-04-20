const addBtn = document.getElementById('add-btn');
const nomeInput = document.getElementById('nome-input');
const valorInput = document.getElementById('valor-input');
const tipoInput = document.getElementById('tipo-input');
const tableBody = document.getElementById('table-body');
const updateNomeInput = document.getElementById('update-nome-input');
const updateValorInput = document.getElementById('update-valor-input');
const updateTipoInput = document.getElementById('update-tipo-input');
const updateBtn = document.getElementById('update-btn');
const cancelBtn = document.getElementById('cancel-btn');

let apolices = JSON.parse(localStorage.getItem('apolices')) || [];
let currentId = null;

function addApolice() {
  const nome = nomeInput.value.trim();
  const valor = parseFloat(valorInput.value.trim());
  const tipo = tipoInput.value.trim();

  if (nome && !isNaN(valor) && valor >= 0 && tipo) {
    let id = 1;
    while (apolices.some(a => a.id === id)) {
      id++;
    }

    const nova = { id, nome, valor, tipo };
    apolices.push(nova);
    localStorage.setItem('apolices', JSON.stringify(apolices));

    nomeInput.value = '';
    valorInput.value = '';
    tipoInput.value = '';
    renderTable();
  } else {
    alert('Preencha todos os campos corretamente!');
  }
}

function showUpdateForm(id) {
  const apolice = apolices.find(a => a.id === id);
  if (apolice) {
    updateNomeInput.value = apolice.nome;
    updateValorInput.value = apolice.valor;
    updateTipoInput.value = apolice.tipo;
    currentId = id;
    document.getElementById('update-container').style.display = 'block';

    updateBtn.onclick = updateApolice;
    cancelBtn.onclick = hideUpdateForm;
  }
}

function updateApolice() {
  const nome = updateNomeInput.value.trim();
  const valor = parseFloat(updateValorInput.value.trim());
  const tipo = updateTipoInput.value.trim();

  if (nome && !isNaN(valor) && valor >= 0 && tipo) {
    const index = apolices.findIndex(a => a.id === currentId);
    if (index !== -1) {
      apolices[index] = { ...apolices[index], nome, valor, tipo };
      localStorage.setItem('apolices', JSON.stringify(apolices));
      hideUpdateForm();
      renderTable();
    }
  } else {
    alert('Preencha todos os campos corretamente!');
  }
}

function hideUpdateForm() {
  updateNomeInput.value = '';
  updateValorInput.value = '';
  updateTipoInput.value = '';
  currentId = null;
  document.getElementById('update-container').style.display = 'none';
}

function deleteApolice(id) {
  apolices = apolices.filter(a => a.id !== id);
  localStorage.setItem('apolices', JSON.stringify(apolices));
  hideUpdateForm();
  renderTable();
}

function renderTable() {
  tableBody.innerHTML = '';
  for (const apolice of apolices) {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${apolice.id}</td>
      <td>${apolice.nome}</td>
      <td>R$ ${apolice.valor.toFixed(2)}</td>
      <td>${apolice.tipo}</td>
      <td>
        <button class="edit-btn">Editar</button>
        <button class="delete-btn">Excluir</button>
      </td>
    `;

    tr.querySelector('.edit-btn').onclick = () => showUpdateForm(apolice.id);
    tr.querySelector('.delete-btn').onclick = () => deleteApolice(apolice.id);

    tableBody.appendChild(tr);
  }
}

addBtn.addEventListener('click', addApolice);
renderTable();