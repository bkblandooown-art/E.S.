/* CAPTURA DO ID DO URL */
const urlAtual = window.location.search;
const urlPar = new URLSearchParams(urlAtual);

const idClientUrl = urlPar.get("id");

const carregaCliente = loadClient();
const listaVeiculosGlobal = loadVeiculo();

console.log("LocalStorage", listaVeiculosGlobal);

/* CAPTURA DO OBJETO DO CLIENTE E VALIDAÇÃO DE O ID EXISTE */
const verificaUrl = carregaCliente.find((idClient) => idClient.id === idClientUrl)

let copiaBaseVeiculo = listaVeiculosGlobal.filter(v => v.idUserCadastrado === verificaUrl.id);

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

        const carregaVeiculo = loadVeiculo();

        const atualizaVeiculos = carregaVeiculo.filter( veiculo => veiculo.idUserCadastrado !== verificaUrl.id );

        const baseAtualizada = [...atualizaVeiculos, ...copiaBaseVeiculo]

        saveVeiculo(baseAtualizada)
        saveCliente(dadosClientAtualizado);
        alert("Cliente atualizado com sucesso!");
        window.location.href = "cliente.html";
    });

};

const modelInput = document.getElementById("inputModelo");
const marcaInput = document.getElementById("inputMarca");
const placaInput = document.getElementById("inputPlaca");

if (modelInput) {
    modelInput.addEventListener("input", (e) => {
        e.target.value = formatInput(e.target.value);
    });
};

if (marcaInput) {
    marcaInput.addEventListener("input", (e) => {
        e.target.value = formatInput(e.target.value);
    });
};

if (placaInput) {
    placaInput.addEventListener("input", (e) => {
        e.target.value = maskPlaca(e.target.value);
    });
};

/* --->>> TABELA DE VEICULOS ATIVOS <<<--- */

/* Acha a tabela de veículos ativos */
const tableVeiculosAtivos = document.getElementById("tbodyVeiculosAtivos")

const veiculoTable = () => {

    if (!tableVeiculosAtivos) return;

    /* Filtra os veículos ativos no cliente */

    const verificaVeiuclo = copiaBaseVeiculo.filter((veiculoAtivo) => veiculoAtivo.idUserCadastrado === verificaUrl.id);

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

if (tableVeiculosAtivos) {
    tableVeiculosAtivos.addEventListener("click", (evento) => {

        if (evento.target.classList.contains("button_table")) {

            const btnDesativa = evento.target.getAttribute("data-id");

            let desativaVeiculo = copiaBaseVeiculo;

            desativaVeiculo = desativaVeiculo.map(desativado => {
                if (desativado.id === btnDesativa) {
                    return { ...desativado, status: "Desativado" };
                };
                return desativado;
            })

            historicoVeiculo()
            veiculoTable()
            alert("Veiculo desativado");
        };

    });
};

/* --->>> FORM ADICIONAR NOVO VEÍCULO <<<--- */

const adicionaVeiculo = () => {

    const formAddVeiculo = document.getElementById("veiculoForm");

    if (!formAddVeiculo) return;

    formAddVeiculo.addEventListener(("submit"), evento => {
        evento.preventDefault();

        const novoVeiculo = Object.fromEntries(new FormData(evento.target));

        const validaPlaca = copiaBaseVeiculo.some(p => p.placaValor === novoVeiculo.placaValor);

        if (validaPlaca) return alert("Veiculo já está cadastrado");

        const newVeiculo = {
            id: idVeiculo(),
            idUserCadastrado: verificaUrl.id,
            marcaValor: novoVeiculo.marcaValor,
            modelValor: novoVeiculo.modelValor,
            placaValor: novoVeiculo.placaValor,
            defeitoValor: "none",
            status: "Ativo"
        };

        copiaBaseVeiculo.push(newVeiculo);

        formAddVeiculo.reset();
        veiculoTable()
    });

};

/* --->>> TABELA DE VEICULOS DESATIVADOS <<<--- */

const historicoVeiculo = () => {

    const tableDesativado = document.getElementById("veiculosDesativados");
    const tbodyVeiculosDesativados = document.getElementById("tbodyVeiculosHistorico");

    if (!tableDesativado) return;

    /* verifica se possui veiculos com status = desativado */

    const veiculoInativo = copiaBaseVeiculo.filter((desaivadoVeiculo) => desaivadoVeiculo.idUserCadastrado === verificaUrl.id && desaivadoVeiculo.status === "Desativado");

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

console.log("Temporario", copiaBaseVeiculo);

btnCancel.addEventListener(("click"), evento => {
    if (evento.target.dispatchEvent) {
        return window.location.href = "cliente.html";
    };
});

adicionaVeiculo();
historicoVeiculo();
veiculoTable();
editaCliente();