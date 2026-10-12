const listaVeiculosAtivos = () => {

    const cliente = loadClient();
    const veiculo = loadVeiculo();

    const tableVeiculos = document.getElementById("veiculosClientDados");

    if(!tableVeiculos) return;

    tableVeiculos.innerHTML = ""

    veiculo.forEach(listViculos => {

        const filtraViculo = veiculo.filter((veiculos) => listViculos.idUserCadastrado === cliente.id);

        console.log(filtraViculo);

        const listaDeVeiculo = document.createElement("tr");
        
        listaDeVeiculo.classList.add("tr_row");

        if (listViculos !== "undefined" || listViculos !== "null" || listViculos !== "") {

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