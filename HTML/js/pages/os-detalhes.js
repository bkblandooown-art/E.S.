const menuLateral = () => {
    const capturaAtual = window.location.pathname;

    const nomePage = capturaAtual.includes("/os-cadastro")

    const pagina = "os"

    renderSideMenu(nomePage, pagina)
};

const getUrl = window.location.search;
const getPar = new URLSearchParams(getUrl);

const OsIdUrl = getPar.get("id");

console.log("id OS =", OsIdUrl);

const carregaOSDb = loadOs();
const baseOs = carregaOSDb.find(os => os.id === OsIdUrl)

const OsStatus = () => {

    console.log("Base de OS", baseOs);
    console.log("Status da OS =", baseOs.status);

    const tituloOS = document.querySelector(".conteudo-titulo");

    tituloOS.innerHTML = '';

    if (baseOs.status === "Fechado") {
        tituloOS.innerHTML = `
    <h3 class="dados-titulo" id="osidTitulo">${OsIdUrl}</h3>
    <p><span class="status-aberto fechado"><i class="bi bi-circle-fill"></i></span>${baseOs.status}</p>
`;
    } else {
        tituloOS.innerHTML = `
    <h3 class="dados-titulo" id="osidTitulo">${OsIdUrl}</h3>
    <p><span class="status-aberto"><i class="bi bi-circle-fill"></i></span>${baseOs.status}</p>
`;
    };

};

const dadosVeiculo = loadVeiculo();
const listaVeiculos = dadosVeiculo.find(v => v.id === baseOs.veiculoCadastradoPlaca);

const dadosCliente = loadClient();
const listaCliente = dadosCliente.find(v => v.id === baseOs.idUserCadastrado);
console.log(listaCliente);

const dadosProduto = loadProdutos();
console.log(dadosProduto);

const preencheDados = () => {

    const marcaVeiculo = document.getElementById("veiculoMarca");
    const modeloVeiculo = document.getElementById("veiculoModelo");
    const placaVeiculo = document.getElementById("veiculoPlaca");
    const defeitoVeiculo = document.getElementById("veiculoDefeito");

    marcaVeiculo.value = listaVeiculos.marcaValor;
    modeloVeiculo.value = listaVeiculos.modelValor;
    placaVeiculo.value = listaVeiculos.placaValor;
    defeitoVeiculo.value = baseOs.defeitoValor;

    const idClient = document.getElementById("clienteId");
    const nomeClient = document.getElementById("clienteNome");
    const docClient = document.getElementById("clienteCpf");
    const contatoClient = document.getElementById("clienteContato");

    idClient.value = listaCliente.id;
    nomeClient.value = listaCliente.clientValor;
    docClient.value = listaCliente.cpfCnpjValor;
    contatoClient.value = listaCliente.contatoValor;

};

let copiaDadosOS = carregaOSDb;

let pecasDaOsAtual = [];

const tablePeca = document.getElementById("tbodyPecas");

const btnAddProd = document.getElementById("btnAddPeca")
const pecaName = document.querySelector(".input-nome");
const pecaValor = document.querySelector(".input-valor");
const pecaQtd = document.querySelector(".input-qtd")
const pecaTotal = document.querySelector(".input-total")

const addPeca = () => {

    tablePeca.addEventListener("input", (e) => {
        const inputDigitado = e.target;

        if (inputDigitado.classList.contains("input-valor") || inputDigitado.classList.contains("input-qtd")) {

            qtd = parseFloat(pecaQtd.value) || 0;
            valor = parseFloat(pecaValor.value) || 0;

            const total = valor * qtd;

            pecaTotal.value = total.toFixed(2);
        };
    });

    

    btnAddProd.addEventListener("click", () => {

        if (pecaName.value === "") return alert("Esse campo não pode estar vazio!");

        const pecasDaOS = {
            id: idProduto(),
            nomePeca: pecaName.value,
            valorPeca: pecaValor.value,
            qtdPeca: pecaQtd.value,
            totalPeca: pecaTotal.value,
        };

        pecasDaOsAtual.push(pecasDaOS);

        console.log(pecasDaOsAtual);

        renderizarTabelaDePecas()
    });
};



const renderizarTabelaDePecas = () =>{

    console.log("filter.",listaPecaNova)

    listaPecaNova.forEach(pecas => {

        const listaProd = document.createElement("tr");

        listaProd.innerHTML = `
         <th class="input-td nome"><input disabled form="AtualizacaoForm" name="nomePeca" type="text"
         class="input-item input-nome" value="${pecas.nomePeca}"></th>
         <th class="input-td unt"><input disabled form="AtualizacaoForm" name="valorPeca" type="number"
         class="input-item input-valor" value="${pecas.valorPeca}" step="0.01"></th>
         <th class="input-td qtd"><input disabled form="AtualizacaoForm" name="qtdPeca" type="number"
         class="input-item input-qtd" value="${pecas.qtdPeca}"></th>
         <th class="input-td preco-total"><input form="AtualizacaoForm" name="totalPeca" type="number" disabled readonly
         class="input-item input-total" value="${pecas.totalPeca}"></th>
         <th class="input-td btn-remove">
         <button type="button" title="Remover" class="btn-remove-item remover-linha" data-id="${pecas.id}"><i class="bi bi-backspace-fill"></i></button>
         </th>
        `
        tablePeca.appendChild(listaProd)

        pecaName.value = "";
        pecaValor.value = "";
        pecaQtd.value = "1";
        pecaTotal.value = "";

        pecaName.focus()
    });
};

const removePeca = () => {

    tablePeca.addEventListener("click", (e) => {

        if (e.target.classList.contains("btn-remove-item")) {
            
            let idBtn = e.target.getAttribute("data-id")

            if (!idBtn) return

            let row = e.target.closest("tr")

            return row.remove()
        };
    });
}

const descServico = document.querySelector(".input-desc-service");
const valorServico = document.querySelector(".input-valor-service");
const totalServico = document.querySelector(".input-total-service");

const btnServico = document.getElementById("btnAddMo")

const tableBodyServico = document.getElementById("tbodyMo");

let service = [];

const addServico = () => {

    tableBodyServico.addEventListener("input", () => {
        
       totalServico.value = valorServico.value;
    
    });

    btnServico.addEventListener("click", () => {

    service = {
        nomeServiço: descServico.value,
        valorServiço: valorServico.value,
        totalServiço: totalServico.value,
    };

    if (descServico.value === "") return alert("Esse campo não pode estar vazio!");
    
    const listaService = document.createElement("tr")

    listaService.innerHTML = `
    <th class="input-td nome">
    <input form="AtualizacaoForm" name="nomeServiço" type="text" class="input-item input-desc-service"
    value="${service.nomeServiço}"></th>
    <th class="input-td unt"><input form="AtualizacaoForm" type="number" name="valorServiço" class="input-item input-valor-service"
    value="${service.valorServiço}" step="0.01"></th>
    <th class="input-td preco-total"><input form="AtualizacaoForm"  name="totalServiço" type="number" disabled readonly
    class="input-item input-total-service" value="${service.totalServiço}"></th>
    <th class="input-td btn-remove-service"><button type="button" title="Remover"
    class="btn-remove-item remover-linha-service" data-id="1"><span class="trash-alt"><i
    class="bi bi-backspace-fill"></i></span></button></th>
    `
    tableBodyServico.appendChild(listaService);

    descServico.value = "";
    valorServico.value = "";
    totalServico.value ="";

    descServico.focus()
    })

};

const removeServico = () => {

    tableBodyServico.addEventListener("click", (e) => {

        if (e.target.classList.contains("remover-linha-service")) {
            
            let idBtn = e.target.getAttribute("data-id")

            if (!idBtn) return

            let row = e.target.closest("tr")

            return row.remove()
        };
    });
}


const formAtualizarOS = document.getElementById("AtualizacaoForm");

formAtualizarOS.addEventListener("submit", (e) => {
    e.preventDefault();

    const dadosFormAtualizaOS = Object.fromEntries(new FormData(e.target));

    console.log(dadosFormAtualizaOS)

    const newProdutos = { id: idProdutos, dadosFormAtualizaOS: nomePeca, dadosFormAtualizaOS: valorPeca };

    console.log(newProdutos);

});


addServico();
removeServico();
removePeca();
addPeca();
preencheDados();
OsStatus();
menuLateral();