const listaCliente = () => {

    const carregaCliente = loadClient();
    const carregaVeiculo = loadVeiculo();

    const tableClient = document.getElementById("TbodyClient");

    if (!tableClient) return;

    tableClient.innerHTML = "";

    carregaCliente.forEach(clientesAba => {

        const verificaVeiculo =  carregaVeiculo.filter((veiculoQtd) => clientesAba.id === veiculoQtd.idUserCadastrado)
        console.log(verificaVeiculo)
        const novaListaClient = document.createElement("tr");

        novaListaClient.classList.add("rowTbody")

        if (clientesAba !== "undefined" || clientesAba !== "null" || clientesAba !== "") {

            novaListaClient.innerHTML = `
            <td class="cellCliente-body" id="cellBodyId">${clientesAba.id}</td>
            <td class="cellCliente-body" id="cellBodyNome">${clientesAba.clientValor}</td>
            <td class="cellCliente-body" id="cellBodyWhatsapp">${clientesAba.contatoValor}</td>
            <td class="cellCliente-body" id="cellBodyEmail">${clientesAba?.emailValor || "-"}</td>
            <td class="cellCliente-body" id="cellBodyVeiculos">${verificaVeiculo.length}</td>
            <td class="cellCliente-body" id="cellBodyStatus">${clientesAba?.status || "Ativo "}</td>
            <td class="btn_cell"><button class="button_table" type="button"
                                    data-id="${clientesAba.id}">Editar</button></td>`;

            tableClient.appendChild(novaListaClient);
        } else {
            novaListaClient.innerHTML =`<td class="cellCliente-body" id="cellBodyId">Clientes não encontrados ou sem dados.</td>`
        }
    });

};

listaCliente();