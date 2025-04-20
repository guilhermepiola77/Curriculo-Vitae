// declaracao das variaveis
const addBtn = document.getElementById('add-btn');
const playerInput = document.getElementById('player-input');
const xpInput = document.getElementById('xp-input');
const tableBody = document.getElementById('table-body');
const updatePlayerInput = document.getElementById('update-player-input');
const updateXpInput = document.getElementById('update-xp-input');
const updateBtn = document.getElementById('update-btn');
const cancelBtn = document.getElementById('cancel-btn');

// variavel para armazenar os dados dos jogadores
let players = JSON.parse(localStorage.getItem('players')) || [];
let currentPlayerId = null;

// funcao para adicionar um novo jogador
function addPlayer() {
    const player = playerInput.value.trim();
    const xp = xpInput.value.trim();
    if (player && xp != null) {
        var id = 1;
        var val = players.map(
            function (x) {
                return x.id;
            }
        ).indexOf(id);
        while (val != -1) {
            id++;
            val = players.map(
                function (x) {
                    return x.id;
                }
            ).indexOf(id);
        }

        const novo = {
            id: id,
            name: player,
            xp: xp
        };

        players.push(novo);
        localStorage.setItem('players', JSON.stringify(players));
        playerInput.value = '';
        xpInput.value = '';
        renderTable();
    } else {
        alert('Preencha todos os campos!');
    }
}

function showUpdateForm(playerId) {

    const player = players.find((player) => player.id === playerId);
    if (player) {

        updatePlayerInput.value = player.name;
        updateXpInput.value = player.xp;
        currentPlayerId = playerId;
        updateBtn.addEventListener('click', updatePlayer);
        cancelBtn.addEventListener('click', hideUpdateForm);
        updateBtn.style.display = 'inlin-block';
        cancelBtn.style.display = 'inlin-block';
        updatePlayerInput.style.display = 'inlin-block';
        updateXpInput.style.display = 'inlin-block';
        document.getElementById('update-container').style.display = 'block';
    }
}

function updatePlayer() {
    const player = updatePlayerInput.value.trim();
    const xp = updateXpInput.value.trim();
    if (player && xp != null) {
        const index = players.findIndex((player) => player.id === currentPlayerId);
        if (index !== -1) {
            players[index].name = player;
            players[index].xp = xp;
        }
        localStorage.setItem('players', JSON.stringify(players));
        hideUpdateForm();
        renderTable();
    } else {
        alert('Preencha todos os campos!');

    }
}

function hideUpdateForm() {
    updatePlayerInput.value = '';
    updateXpInput.value = '';
    currentPlayerId = null;
    updateBtn.removeEventListener('click', updatePlayer)
    cancelBtn.removeEventListener('click', hideUpdateForm)
    updateBtn.style.display = 'none'
    cancelBtn.style.display = 'none'
    updatePlayerInput.style.display = 'none'
    updateXpInput.style.display = 'none'
    document.getElementById('update-container').style.display = 'none'
}

function deletePlayer(playerId) {
    players = players.filter((player) => player.id !== playerId);
    localStorage.setItem('players', JSON.stringify(players));
    if (players.length == 0) {
        hideUpdateForm();
    }
    renderTable();
}

function renderTable() {
    tableBody.innerHTML = '';
    for (let i = 0; i < players.length; i++) {
        const player = players[i];

        //variavel que representa uma linha da tabela
        const tr = document.createElement('tr');
        //variavel qu representa o id do jogador
        const idTd = document.createElement('td');
        //variavel que representa o nome do jogador
        const playerTd = document.createElement('td');
        //variavel que representa o XP do jogador
        const xpTd = document.createElement('td');
        //celula com os botoes de editar e excluir
        const actionsTd = document.createElement('td');

        //variavel que representa o botao de editar
        const editBtn = document.createElement('button');
        //varivel que representa o botao de excluir
        const deleteBtn = document.createElement('button');

        //personalizar os botões
        editBtn.className = 'edit-btn';
        deleteBtn.className = 'delete-btn';

        //adicionar o texto as tags
        idTd.innerText = player.id;
        playerTd.innerText = player.name;
        xpTd.innerText = player.xp;
        editBtn.innerText = 'Editar';
        deleteBtn.innerText = 'Excluir';

        //adicionar os eventos de clique

        editBtn.addEventListener('click',
            () => {
                showUpdateForm(player.id);
            }
        );
        deleteBtn.addEventListener('click',
            () => {
                deletePlayer(player.id);

            }
        );

        //faz o montamento da linha para add a tabela
        actionsTd.appendChild(editBtn);
        actionsTd.appendChild(deleteBtn);
        tr.appendChild(idTd);
        tr.appendChild(playerTd);
        tr.appendChild(xpTd);
        tr.appendChild(actionsTd);
        tableBody.appendChild(tr);

    }
}

//add o acao do botao de add player
addBtn.addEventListener('click', addPlayer);

//inicializar a tabela
renderTable();