const listaVeiculosAtivos = () => {

    const cliente = loadClient();
    const veiculo = loadVeiculo();

    const tableVeiculos = document.getElementById("veiculosClientDados");

    if(!tableVeiculos) return;

    tableVeiculos.innerHTML = ""

    const filtraViculo = veiculo.filter(veiculos => veiculos.idUserCadastrado === cliente.id);

    console.log("Lista", filtraViculo);

    if (filtraViculo.length === 0) {

        const listaVasia = document.createElement("tr");

        listaVasia.classList.add("tr_row");

        listaVasia.innerHTML = `
            <td colspan="7">Clientes não encontrados ou sem dados.</td>
        `;
        return;
    }

    veiculo.forEach(listViculos => {

        const listaDeVeiculo = document.createElement("tr");
        
        listaDeVeiculo.classList.add("tr_row");

        if (listViculos !== undefined) {

            listaDeVeiculo.innerHTML = `
            <td class="cellCliente-body" id="cellBodyId">${listViculos.id}</td>
            <td class="cellCliente-body" id="cellBodyNome">${listViculos.marcaValor}</td>
            <td class="cellCliente-body" id="cellBodyWhatsapp">${listViculos.modelValor}</td>
            <td class="cellCliente-body" id="cellBodyEmail">${listViculos.placaValor}</td>
            <td class="btn_cell"><button class="button_table" type="button"
                                    data-id="${listViculos.id}">Editar</button></td>`;
                                    
                                    tableVeiculos.appendChild(listaDeVeiculo);

        } else {novaListaClient.innerHTML =`<td class="cellCliente-body" id="cellBodyId">Clientes não encontrados ou sem dados.</td>`}
    });
};

listaVeiculosAtivos()