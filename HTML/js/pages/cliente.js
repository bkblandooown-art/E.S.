const carregaCliente = loadClient();
const carregaVeiculo = loadVeiculo();

const listaCliente = () => {

    const tableClient = document.getElementById("TbodyClient");

    if (!tableClient) return;

    tableClient.innerHTML = "";

    if (carregaCliente.length === 0) {

        const listaVazia = document.createElement("tr");

        listaVazia.innerHTML =
            `<td colspan="7" style="padding-top: 10px; border-top: 1px solid #ede9f0; display: flex; justify-content: center;">Nenhum cliente cadastrado.</td>`;

        tableClient.appendChild(listaVazia);

        return;
    }

    tableClient.innerHTML = "";

    carregaCliente.forEach(client => {

        const verificaVeiculo = carregaVeiculo.filter((veiculo) => veiculo.idUserCadastrado === client.id)

        const novaListaClient = document.createElement("tr");

        novaListaClient.classList.add("rowTbody")

        novaListaClient.innerHTML = `
            <td class="cellCliente-body" id="cellBodyId">${client.id}</td>
            <td class="cellCliente-body" id="cellBodyNome">${client.clientValor}</td>
            <td class="cellCliente-body" id="cellBodyWhatsapp">${client.contatoValor}</td>
            <td class="cellCliente-body" id="cellBodyEmail">${client?.emailValor || "-"}</td>
            <td class="cellCliente-body" id="cellBodyVeiculos">${verificaVeiculo.length}</td>
            <td class="cellCliente-body" id="cellBodyStatus">${client?.status || "Ativo "}</td>
            <td class="btn_cell"><button class="button_table" type="button"
                                    data-id="${client.id}">Editar</button></td>`;

        tableClient.appendChild(novaListaClient);

    });
};

const listClient = document.getElementById("clienteTable");

if (listClient) {

    listClient.addEventListener('click', (evento) => {

        if (evento.target.classList.contains("button_table")) {

            const clientId = evento.target.getAttribute('data-id');

            window.location.href = ("cliente-editar.html?id=" + clientId)

        }
    });
};

const btnNovo = document.getElementById("btnNovoCliente");

if (btnNovo) {
    btnNovo.addEventListener("click", (evento) => {
        window.location.href = "cliente-criar-novo.html";
    });
};

listaCliente();