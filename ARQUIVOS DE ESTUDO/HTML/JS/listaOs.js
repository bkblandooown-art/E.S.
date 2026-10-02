const renderOs = () => {

    const tabelaOs = document.getElementById("tbodyOS");

    if (!tabelaOs) return;

    tabelaOs.innerHTML = "";

    const carredaDbs = (loadOs(), loadClient(), loadVeiculo());

    carredaDbs.forEach(OsDados => {

        const novaLinha = document.createElement("tr");

        novaLinha.classList.add("tr_row");

        novaLinha.innerHTML = `
            <td class="td_cell" id="td_id">${OsDados[loadOs]}</td>
            <td class="td_cell" id="td_client">${OsDados.loadClient.clientValor}</td> 
            <td class="td_cell" id="td_model">${OsDados.loadVeiculo.modelValor}</td>
            <td class="td_cell" id="td_placa">${OsDados.loadVeiculo.placaValor}</td>
            <td class="td_cell" id="td_status">${OsDados.loadOs.status}</td>
            <td><button class="button_table" type="button" data-id="${OsDados.loadOs.id}">Delete</button></td>
        `;

        tabelaOs.appendChild(novaLinha);

    });

    if (tabelaOs) {
        // ATENÇÃO: Adicionamos o addEventListener fora do forEach para não duplicar ouvintes!
        // (Ver nota explicativa abaixo)
    }

    const totalFoot = document.getElementById("totalOS");
    if (totalFoot) {
        totalFoot.innerText = carredaDbs.length;
    }
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