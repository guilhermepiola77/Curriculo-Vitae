// Função para calcular a média de consumo na página calculadora.html
function calcularConsumo() {
    const distancia = parseFloat(document.getElementById('distancia').value);
    const combustivel = parseFloat(document.getElementById('combustivel').value);
    const resultadoDiv = document.getElementById('resultado-consumo');

    if (isNaN(distancia) || isNaN(combustivel) || combustivel === 0) {
        resultadoDiv.textContent = 'Por favor, preencha os campos corretamente.';
        return;
    }

    const consumoMedio = distancia / combustivel;
    resultadoDiv.textContent = `O consumo médio do veículo é de ${consumoMedio.toFixed(2)} km/l.`;
}

// Função para salvar uma nova dica na página dicas.html
function salvarDica() {
    const titulo = document.getElementById('titulo-dica').value.trim();
    const descricao = document.getElementById('descricao-dica').value.trim();
    const listaDicasElement = document.getElementById('dicas-salvas'); // Renomeei para evitar confusão

    if (titulo === '' || descricao === '') {
        alert('Por favor, preencha o título e a descrição da dica.');
        return;
    }

    const dica = { titulo: titulo, descricao: descricao };
    let dicas = JSON.parse(localStorage.getItem('dicas')) || [];
    dicas.push(dica);
    localStorage.setItem('dicas', JSON.stringify(dicas));

    // Limpar o formulário
    document.getElementById('form-dica').reset();

    // Atualizar a lista de dicas exibida
    exibirDicas();
}

// Função para exibir as dicas salvas na página dicas.html
function exibirDicas() {
    const listaDicasElement = document.getElementById('dicas-salvas'); // Renomeei para evitar confusão
    listaDicasElement.innerHTML = ''; // Limpar a lista antes de exibir

    const dicas = JSON.parse(localStorage.getItem('dicas')) || [];
    if (dicas.length === 0) {
        listaDicasElement.innerHTML = '<p>Nenhuma dica cadastrada ainda.</p>';
        return;
    }

    const ul = document.createElement('ul');
    dicas.forEach((dica) => { // Removi o index, não estava sendo usado
        const li = document.createElement('li');
        li.innerHTML = `<strong>${dica.titulo}:</strong> ${dica.descricao}`;
        ul.appendChild(li);
    });
    listaDicasElement.appendChild(ul);
}

// Carregar as dicas ao carregar a página dicas.html
if (document.getElementById('dicas-salvas')) {
    exibirDicas();
}

// Função para salvar uma nova despesa na página historico.html
function salvarDespesa() {
    const data = document.getElementById('data-despesa').value;
    const descricao = document.getElementById('descricao-despesa').value.trim();
    const valor = parseFloat(document.getElementById('valor-despesa').value);
    const tipo = document.getElementById('tipo-despesa').value;

    if (data === '' || descricao === '' || isNaN(valor)) {
        alert('Por favor, preencha todos os campos da despesa corretamente.');
        return;
    }

    const despesa = { data: data, descricao: descricao, valor: valor, tipo: tipo };
    let despesas = JSON.parse(localStorage.getItem('despesas')) || [];
    despesas.push(despesa);
    localStorage.setItem('despesas', JSON.stringify(despesas));

    // Limpar o formulário
    document.getElementById('form-despesa').reset();

    // Atualizar a lista de despesas exibida
    exibirDespesas();
}

// Função para exibir as despesas salvas na página historico.html
function exibirDespesas() {
    const listaDespesasDiv = document.getElementById('lista-despesas');
    const totalDespesaDiv = document.getElementById('total-despesa');
    listaDespesasDiv.innerHTML = ''; // Limpar a lista

    const despesas = JSON.parse(localStorage.getItem('despesas')) || [];
    if (despesas.length === 0) {
        listaDespesasDiv.innerHTML = '<p>Nenhuma despesa cadastrada ainda.</p>';
        totalDespesaDiv.textContent = '';
        return;
    }

    let total = 0;
    let htmlDespesas = '<ul>';
    despesas.forEach(despesa => {
        htmlDespesas += `<li>${despesa.data} - ${despesa.descricao} - ${despesa.tipo}: R$ ${despesa.valor.toFixed(2)}</li>`;
        total += despesa.valor;
    });
    htmlDespesas += '</ul>';

    listaDespesasDiv.innerHTML = htmlDespesas;
    totalDespesaDiv.textContent = `Total: R$ ${total.toFixed(2)}`;
}

// Carregar as despesas ao carregar a página historico.html
if (document.getElementById('lista-despesas')) {
    exibirDespesas();
}

// Função para gerar o relatório em PDF na página historico.html
function gerarRelatorioPDF() {
    const listaDespesasDiv = document.getElementById('lista-despesas');
    const totalDespesaDiv = document.getElementById('total-despesa');

    if (listaDespesasDiv.innerHTML === '<p>Nenhuma despesa cadastrada ainda.</p>') {
        alert('Não há despesas para gerar o relatório.');
        return;
    }

    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF();

    pdf.text('Relatório de Despesas de Viagem', 10, 10);
    pdf.fromHTML(listaDespesasDiv.innerHTML, 10, 20);
    pdf.text(totalDespesaDiv.textContent, 10, pdf.internal.pageSize.getHeight() - 10);

    pdf.save('relatorio_despesas.pdf');
}