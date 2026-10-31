const carregaCliente = loadClient();
const carregaVeiculo = loadVeiculo();

const inptDocument = document.getElementById("inputCpfCnpj");
const inptEmail = document.getElementById("inputEmail");
const inptContato = document.getElementById("inputContato");

const inptMarca = document.getElementById("inputMarca");
const inptModel = document.getElementById("inputModelo");
const inptPlaca = document.getElementById("inputPlaca");

let copiaDadosVeiculo = [];

// inicio da formatação de campos vvv
const formatacaoCampos = [
    { elemento: inptDocument, formatacao: maskDocument },
    { elemento: inptEmail, formatacao: maskEmail },
    { elemento: inptContato, formatacao: maskContato },
    { elemento: inptMarca, formatacao: formatInput },
    { elemento: inptModel, formatacao: formatInput },
    { elemento: inptPlaca, formatacao: maskPlaca }
];

formatacaoCampos.forEach(({ elemento, formatacao }) => {
    if (!elemento) return;

    elemento.addEventListener("input", (e) => {
        e.target.value = formatacao(e.target.value);
    });
});
// fim da formatação de campos ^^^

// início da captura de dados do cliente vvv
const criaCliente = () => {

    // inicio da validação de cadastro de documento vvv

    const formCriaClient = document.getElementById("clientForm");

    if (!formCriaClient) return;

    inptDocument.addEventListener("blur", (e) => {

        const verificaCPF = carregaCliente.find(c => c.cpfCnpjValor === e.target.value);

        if (e.target.value.trim() === "") return;

        if (verificaCPF) {
            alert("Já existe cadastro pra esse Documento");
            e.target.value = "";
            return
        };

    });

    // fim da validação de cadastro de documento ^^^

    formCriaClient.addEventListener("submit", (evento) => {
        evento.preventDefault();

        const idUserCadastrado = idCliente();

        const clientValue = Object.fromEntries(new FormData(evento.target));

        const newClient = { id: idUserCadastrado, ...clientValue, dataCriacao: dataDeCriacao() };

        const veiculoAtualizados = copiaDadosVeiculo.map(v => {
            if (v.status === "Ativo") {
                return { ...v, idUserCadastrado: newClient.id }
            }; return v;
        });

        const salvarVeiculos = carregaVeiculo.filter(veiculo => veiculo.idUserCadastrado !== newClient.id)

        const updateBase = [...salvarVeiculos, ...veiculoAtualizados]

        console.log("Dados do Cliente", newClient);
        console.log("Dados do Veículo", updateBase);

        carregaCliente.push(newClient)

        saveCliente(carregaCliente)
        saveVeiculo(updateBase)
        alert("Cliente criado com sucesso!");
        window.location.href = "cliente.html";
    });
};
// fim da captura de dados do cliente ^^^

// início da criação de um veiculo vvv

const criaVeiculo = () => {

    const formVeiculo = document.getElementById("veiculoForm");

    if (!formVeiculo) return;

    // inicio da validação de placa do veículo vvv

    inptPlaca.addEventListener("blur", (e) => {

        const verificaPlaca = carregaVeiculo.some(v => v.placaValor === e.target.value);

        if (e.target.value.trim() === "") return;

        if (verificaPlaca) {
            alert("Veículo cadastrado para outro cliente!")
            formVeiculo.reset();
            return
        };

    });
    // fim da validação de placa do veículo ^^^

    console.log(copiaDadosVeiculo);

    formVeiculo.addEventListener("submit", (e) => {
        e.preventDefault()

        const veiculoValor = Object.fromEntries(new FormData(e.target));

        let veiculoCadastradoPlaca = idVeiculo();

        const newVeiculo = { id: veiculoCadastradoPlaca, ...veiculoValor, status: "Ativo" };

        copiaDadosVeiculo.push(newVeiculo);

        console.log("Lista na criação", copiaDadosVeiculo);

        formVeiculo.reset()

        tableVeiculos()

    });
};

// fim da criação de um veiculo ^^^

const bodyVeiculos = document.getElementById("tbodyVeiculos");


const tableVeiculos = () => {

    const tabVeiculos = document.getElementById("tableVeiculos");

    if (!tabVeiculos) return;

    bodyVeiculos.innerHTML = "";

    if (copiaDadosVeiculo.length === 0) {

        const semVeiculos = document.createElement("tr");

        semVeiculos.innerHTML = `
        <td colspan="7" style="padding-top: 10px; border-top: 1px solid #ede9f0; display: flex; justify-content: center;">Nenhum veículo encontrado.</td>
        `;
        bodyVeiculos.appendChild(semVeiculos);

        return;
    };

    console.log("Lista na tabela", copiaDadosVeiculo);

    bodyVeiculos.innerHTML = "";

    copiaDadosVeiculo.forEach(veiculos => {

        const lista = document.createElement("tr");

        lista.classList.add("rowTbody");

        lista.innerHTML = `
            <td class="td_cell">${veiculos.id}</td>
            <td class="td_cell">${veiculos.marcaValor}</td>
            <td class="td_cell">${veiculos.modelValor}</td>
            <td class="td_cell">${veiculos.placaValor}</td>
            <td><button class="button_table" type="button" data-id="${veiculos.id}">Remover</button></td>
        `;
        bodyVeiculos.appendChild(lista);
    });

};

const remove = () => {

    const tabVeiculos = document.getElementById("tableVeiculos");

    if (!tabVeiculos) return;

    tabVeiculos.addEventListener("click", (e) => {

        if (e.target.classList.contains("button_table")) {

            const removerVeiculo = e.target.getAttribute("data-id");

            const veiculoRemovido = copiaDadosVeiculo.filter(v => v.id !== removerVeiculo);

            copiaDadosVeiculo = veiculoRemovido

            tableVeiculos();
        };
    });
};

remove()
criaVeiculo();
tableVeiculos();
criaCliente();