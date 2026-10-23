/* CAPTURA DO ID DO URL */
const urlAtual = window.location.search;
const urlPar = new URLSearchParams(urlAtual);

const idClientUrl = urlPar.get("id");

const carregaCliente = loadClient();

/* CAPTURA DO OBJETO DO CLIENTE E VALIDAÇÃO DE O ID EXISTE */
const verificaUrl = carregaCliente.find((idClient) => idClient.id === idClientUrl)

const btnCancel = document.getElementById("btnClientCancel");

/* --- FORM DE INFORMAÇÕES DE CLIENTE --- */

const editaCliente = () => {

    const carregaCliente = loadClient();

    const formClient = document.getElementById("clientForm");

    if (!formClient) return;
    if (!verificaUrl) return;

    const intpNome = document.getElementById("inputNome");
    const intpCpfCnpj = document.getElementById("inputCpfCnpj");
    const intpEmail = document.getElementById("inputEmail");
    const intpContato = document.getElementById("inputContato");
    const intpData = document.getElementById("inputData");

    /* FORMATAÇÃO DE DADOS */

    if (intpCpfCnpj) {
        intpCpfCnpj.addEventListener("input", (e) => {
            e.target.value = maskDocument(e.target.value);
        });
    };

    if (intpContato) {
        intpContato.addEventListener("input", (e) => {
            e.target.value = maskContato(e.target.value);
        });
    };

    /* PREENCHIMENTO DOS CAMPOS DE DIGITAÇÃO */

    intpNome.value = verificaUrl.clientValor;
    intpCpfCnpj.value = verificaUrl.cpfCnpjValor;
    intpContato.value = verificaUrl.contatoValor;

    const emailExist = () => {
        if (verificaUrl.emailValor) { intpEmail.value = verificaUrl.emailValor; }
        return intpEmail.placeholder = "Adicionar email";
    }; emailExist()

    const dataExist = () => {
        if (verificaUrl.dataValor) { intpData.value = verificaUrl.dataValor; }
        return intpData.placeholder = "dd/mm/aaaa";
    }; dataExist()

    /* MANIPULAÇÃO DO FORM */

    formClient.addEventListener(("submit"), evento => {
        evento.preventDefault();

        const emailValor = intpEmail.value;
        const dataValor = intpData.value;

        const novoNome = intpNome.value;
        const novoContato = intpContato.value;
        const novoCpfCnpj = intpCpfCnpj.value;

        const dadosClientAtualizado = carregaCliente.map(clienteEditado => {

            if (clienteEditado.id === idClientUrl) {

                return { ...clienteEditado, clientValor: novoNome, cpfCnpjValor: novoCpfCnpj, contatoValor: novoContato, emailValor, dataValor }

            } return clienteEditado;
        });

        saveCliente(dadosClientAtualizado);
        alert("Cliente atualizado com sucesso!");
        window.location.href = "cliente.html";
    });

};

/* --->>> TABELA DE VEICULOS ATIVOS <<<--- */

const veiculoTable = () => {

    const carregaVeiculo = loadVeiculo();

    /* Acha a tabela de veículos ativos */
    const tableVeiculosAtivos = document.getElementById("tbodyVeiculosAtivos")

    if (!tableVeiculosAtivos) return;

    /* Filtra os veículos ativos no cliente */

    const verificaVeiuclo = carregaVeiculo.filter((veiculoAtivo) => veiculoAtivo.idUserCadastrado === verificaUrl.id);

    if (!verificaUrl) {
        window.location.href = "clientes.html";
        return;
    }

    const verificaStatus = verificaVeiuclo.filter((veiculoStatus) => veiculoStatus.status === "Ativo");

    tableVeiculosAtivos.innerHTML = ""

    /* Verifica se possui veículos se não houver: "Nenhum veículo encontrado" */

    if (verificaStatus.length === 0) {

        const veiculoVazio = document.createElement("tr");

        veiculoVazio.innerHTML =
            `<td colspan="7" style="padding-top: 10px; border-top: 1px solid #ede9f0; display: flex; justify-content: center;">Nenhum veículo encontrado.</td>`;

        tableVeiculosAtivos.appendChild(veiculoVazio);

        return;
    }

    /* Passa por cada veículo e adiciona na tabela */

    verificaStatus.forEach((veiculo) => {

        

        const listaAtivos = document.createElement("tr");

        listaAtivos.classList.add("rowTbody");

        listaAtivos.innerHTML = `
            <td class="td_cell">${veiculo.id}</td>
            <td class="td_cell">${veiculo.marcaValor}</td>
            <td class="td_cell">${veiculo.modelValor}</td>
            <td class="td_cell">${veiculo.placaValor}</td>
            <td><button class="button_table" type="button" data-id="${veiculo.id}">Desativar</button></td>
        `;

        tableVeiculosAtivos.appendChild(listaAtivos);

    });

};

const tableVeiculosAtivos = document.getElementById("veiculosAtivos");

if (!tableVeiculosAtivos) {
    tableVeiculosAtivos.addEventListener("click", (evento) => {

        if (evento.target.classList.contains("button_table")) {

            const btnDesativa = evento.target.getAttribute("data-id");

            let desativaVeiculo = loadVeiculo();

            desativaVeiculo = desativaVeiculo.map(desativado => {
                if (desativado.id === btnDesativa) {
                    return { ...desativado, status: "Desativado" };
                };
                return desativado;
            })

            saveVeiculo(desativaVeiculo);
            historicoVeiculo()
            veiculoTable()
            alert("Veiculo deletado com sucesso");
        };

    });
};
/* --->>> TABELA DE VEICULOS DESATIVADOS <<<--- */

const historicoVeiculo = () => {

    const carregaVeiculo = loadVeiculo();

    const tableDesativado = document.getElementById("veiculosDesativados");
    const tbodyVeiculosDesativados = document.getElementById("tbodyVeiculosHistorico");

    if (!tableDesativado) return;

    /* verifica se possui veiculos com status = desativado */

    const veiculoInativo = carregaVeiculo.filter((desaivadoVeiculo) => desaivadoVeiculo.idUserCadastrado === verificaUrl.id && desaivadoVeiculo.status === "Desativado");

    console.log(veiculoInativo)

    /* se não tiver então retrona a mensagem: Não foram encontrados veículos desativados */

    if (veiculoInativo.length === 0) {

        const veiculoVazio = document.createElement("tr");

        veiculoVazio.innerHTML =
            `<td colspan="7" style="padding-top: 10px; border-top: 1px solid #ede9f0; display: flex; justify-content: center;">Nenhum veículo encontrado.</td>
        `;

        tableDesativado.appendChild(veiculoVazio);

        return;
    }

    /* passa por cada veiculo na lista de desativado e monta a tabela */

    veiculoInativo.forEach((desativado) => {

        tbodyVeiculosDesativados.innerHTML = ""

        const listaVeiculoDesativado = document.createElement("tr")

        listaVeiculoDesativado.classList.add("rowTbody")

        listaVeiculoDesativado.innerHTML = `
            <td class="cellCliente-body">${desativado.id}</td>
            <td class="cellCliente-body">${desativado.marcaValor}</td>
            <td class="cellCliente-body">${desativado.modelValor}</td>
            <td class="cellCliente-body">${desativado.placaValor}</td>
            <td class="cellCliente-body">${desativado.status}</td>`;

        tableDesativado.appendChild(listaVeiculoDesativado);
    })
};


btnCancel.addEventListener(("click"), evento => {
    if (evento.target.dispatchEvent) {
        return window.location.href = "cliente.html";
    };
});

historicoVeiculo();
veiculoTable();
editaCliente();