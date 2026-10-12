
const carregaCliente = loadClient();
const carregaVeiculo = loadVeiculo();

console.log(carregaCliente)

const editaCliente = () => {
    /* CAPTURA DO ID DO URL */
    const urlAtual = window.location.search;
    const urlPar = new URLSearchParams(urlAtual);

    const idClientUrl = urlPar.get("id");

    /* CAPTURA DO ID DO FORM E VALIDAÇÃO SE EXISTE */

    const formClient = document.getElementById("clientForm");

    if (!formClient) return;

    /* CAPTURA DO OBJETO DO CLIENTE E VALIDAÇÃO DE O ID EXISTE */
    const verificaUrl = carregaCliente.find((idClient) => idClient.id === idClientUrl)

    if (!verificaUrl) return;

    const intpNome = document.getElementById("inputNome");
    const intpCpfCnpj = document.getElementById("inputCpfCnpj");
    const intpEmail = document.getElementById("inputEmail");
    const intpContato = document.getElementById("inputContato");
    const intpData = document.getElementById("inputData");
    /* FORMATAÇÃO DE DADOS */
    intpCpfCnpj.addEventListener("input", (evento) => {
        let valor = evento.target.value.replace(/\D/g, '');

        valor = valor.replace(/(\d{3})(\d)/, '$1.$2');
        valor = valor.replace(/(\d{3})(\d)/, '$1.$2');
        valor = valor.replace(/(\d{3})(\d{1,2})$/, '$1-$2');

        evento.target.value = valor;
    });

    intpContato.addEventListener("input", (evento) => {
        let valor = evento.target.value.replace(/\D/g, '');

        if (valor.length > 11) valor = valor.slice(0, 11);

        if (valor.length > 10) {
            valor = valor.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3');
        } else if (valor.length > 6) {
            valor = valor.replace(/^(\d{2})(\d{4})(\d{0,4})$/, '($1) $2-$3');
        } else if (valor.length > 2) {
            valor = valor.replace(/^(\d{2})(\d{0,5})$/, '($1) $2');
        } else if (valor.length > 0) {
            valor = valor.replace(/^(\d{0,2})$/, '($1');
        }

        evento.target.value = valor;
    });

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

    formClient.addEventListener(('submit'), evento => {
        evento.preventDefault();

        const emailValor = intpEmail.value;
        const dataValor = intpData.value;

        const novoNome = intpNome.value;
        const novoContato = intpContato.value;
        const novoCpfCnpj = intpCpfCnpj.value;

        const dadosClientAtualizado =  carregaCliente.map( clienteEditado => {

            if (clienteEditado.id === idClientUrl) {

                return { ...clienteEditado, clientValor: novoNome , cpfCnpjValor: novoCpfCnpj , contatoValor: novoContato, emailValor, dataValor }

            } return clienteEditado;
        });

        saveCliente(dadosClientAtualizado);
        alert("Cliente atualizado com sucesso!");
        window.location.href = "abaClient.html";
    });

};

editaCliente()