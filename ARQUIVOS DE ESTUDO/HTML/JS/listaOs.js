const renderOs = () => {

    const carregaOS = loadOs();
    const carregaCliente = loadClient();
    const carregaVeiculo = loadVeiculo();

    const tabelaOs = document.getElementById("tbodyOS");

    if (!tabelaOs) return;

    tabelaOs.innerHTML = "";

    carregaOS.forEach(OsDados => {

        const veiculoEncontrado = carregaVeiculo.find((veiculo) => OsDados.idVeiculoUnico === veiculo.id )

        console.log(veiculoEncontrado)

        const clienteEncontrado = carregaCliente.find((cliente) => OsDados.idUserCadastrado === cliente.id );

        console.log(clienteEncontrado)

        const novaLinha = document.createElement("tr");

        novaLinha.classList.add("tr_row");

        novaLinha.innerHTML = `
            <td class="td_cell" id="td_id">${OsDados.id}</td>
            <td class="td_cell" id="td_client">${clienteEncontrado?.clientValor || "Não encontrado"}</td> 
            <td class="td_cell" id="td_model">${veiculoEncontrado.modelValor}</td>
            <td class="td_cell" id="td_placa">${veiculoEncontrado.placaValor}</td>
            <td class="td_cell" id="td_status">${OsDados.status}</td>
            <td><button class="button_table" type="button" data-id="${OsDados.id}">Delete</button></td>
        `;

        tabelaOs.appendChild(novaLinha);

    });

    const totalFoot = document.getElementById("totalOS");

    if (totalFoot) {
        totalFoot.innerText = carregaOS.length;
    };
};

// Configuramos o evento de clique na tabela APENAS UMA VEZ fora da função de renderização
const tabelaOsGlobal = document.getElementById("tbodyOS");

if (tabelaOsGlobal) {
    tabelaOsGlobal.addEventListener("click", (evento) => {
        if (evento.target.classList.contains("button_table")) {
            // CORREÇÃO: Removido o Number(), pois o ID é uma String alfanumérica
            const osId = evento.target.getAttribute("data-id");

            let listaOs = loadOs();

            // CORREÇÃO: Alterado o parâmetro para 'item' para evitar confusão de nomes
            listaOs = listaOs.filter(item => item.id !== osId);

            saveOs(listaOs);
            renderOs();

            alert("OS deletada com sucesso");
        }
    });
}

renderOs();