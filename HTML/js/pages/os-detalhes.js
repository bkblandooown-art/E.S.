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

preencheDados();
OsStatus();
menuLateral();