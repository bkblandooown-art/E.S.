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

const OsStatus = () =>{

console.log("Base de OS", baseOs);
console.log("Status da OS =", baseOs.status);

const tituloOS = document.querySelector(".conteudo-titulo");

tituloOS.innerHTML='';

if (baseOs.status === "Fechado") {
    tituloOS.innerHTML=`
    <h3 class="dados-titulo" id="osidTitulo">${OsIdUrl}</h3>
    <p><span class="status-aberto fechado"><i class="bi bi-circle-fill"></i></span>${baseOs.status}</p>
`;
} else {
    tituloOS.innerHTML=`
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

let copiaProduto = [];

const atualizaOs = () =>{

    const formAtualizarOS = document.getElementById("AtualizacaoForm");

    if (!formAtualizarOS) return;

    formAtualizarOS.addEventListener("submit", (e) =>{
        e.preventDefault();

        const dadosFormAtualizaOS = Object.fromEntries(new FormData(e.target));

        console.log(dadosFormAtualizaOS)

        const newProdutos = {id: idProdutos, dadosFormAtualizaOS: nomePeca, dadosFormAtualizaOS: valorPeca };

        console.log(newProdutos);

    });

    

};
const tablePeca = document.getElementById("tbodyPecas")

const addProduto = () => {

    if (!tablePeca) return;

    const btnAddProd = document.getElementById("btnAddPeca")

    const pecaName = document.querySelector(".input-nome");
    const pecaValor = document.querySelector(".input-valor");
    const pecaQtd = document.querySelector(".input-qtd")
    const pecaTotal = document.querySelector(".input-total")
    
    let qtd = pecaQtd.value;
    let total = pecaTotal.value

    btnAddProd.addEventListener("click", (event) =>{
        
        const newProdutos = {
            id: idProduto(),
            nomePeca: pecaName.value,
            valorPeca: pecaValor.value };
    
        copiaProduto.push(newProdutos)
        
        copiaProduto.forEach((prod) => {

            const listaProd = document.createElement("tr");

            listaProd.innerHTML = `

             <tr class="tr-inputs linha-item">
             <th class="input-td nome"><input disabled form="AtualizacaoForm" name="nomePeca" type="text"
             class="input-item input-nome" value="${copiaProduto.nomePeca}"></th>
             <th class="input-td unt"><input disabled form="AtualizacaoForm" name="valorPeca" type="number"
             class="input-item input-valor" value="${copiaProduto.valorPeca}" step="0.01"></th>
             <th class="input-td qtd"><input disabled form="AtualizacaoForm" name="qtdPeca" type="number"
             class="input-item input-qtd" value="${qtd}"></th>
             <th class="input-td preco-total"><input form="AtualizacaoForm" name="totalPeca" type="number" disabled readonly
             class="input-item input-total" value="${total}"></th>
             <th class="input-td btn-remove"><button type="button" data-id:"${copiaProduto.id}" title="Remover"
             class="btn-remove-item remover-linha"><span class="trash-alt"><i
             class="bi bi-backspace-fill"></i></span></button></th>
             </tr>
            `
        });
    });
};

tablePeca.addEventListener("input", (e) => {

    const inputDigitado = e.target;

    if (inputDigitado.classList.contains("input-valor") || inputDigitado.classList.contains("input-qtd")){

        const linhaAtual = inputDigitado.closest('tr');

        const inputQtd =  linhaAtual.querySelector(".input-qtd")
        const inputValor =  linhaAtual.querySelector(".input-valor")
        const inputTotal =  linhaAtual.querySelector(".input-total")

        const qtd = parseFloat(inputQtd.value) || 0;
        const valor = parseFloat(inputValor.value) || 0;

        const total = valor*qtd;

        inputTotal.value = total.toFixed(2);
        };

    });

addProduto();
atualizaOs();
preencheDados();
OsStatus();
menuLateral();