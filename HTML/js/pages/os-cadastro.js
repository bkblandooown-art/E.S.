const carregaOs = loadOs();
const carregaClient = loadClient();
const carregaVeiculo = loadVeiculo();

const confgOS = () => {
    const formOS = document.getElementById("ClientForm");

    if (!formOS) return;

    const nomeClient = document.getElementById("inputNomeClient");
    const cpfCnpjClient = document.getElementById("inputCPF");
    const contatoClient = document.getElementById("inputTel");
    const marcaVeiculo = document.getElementById("inputMarcaVeiculo");
    const modelVeiculo = document.getElementById("inputModelVeiculo");
    const placaVeiculo = document.getElementById("inputPlaca");
    const defeitoVeiculo = document.getElementById("inputDefeito");

    if (cpfCnpjClient) {
        cpfCnpjClient.addEventListener("input", (e) => {
            e.target.value = maskDocument(e.target.value);
            });
    };

    if (contatoClient) {
        contatoClient.addEventListener("input", (e) => {
            e.target.value = maskContato(e.target.value);
        });
    };

    if (placaVeiculo) {
        placaVeiculo.addEventListener("input", (e) =>{
            e.target.value = maskPlaca(e.target.value);
        });
    };

    if (modelVeiculo) {
        modelVeiculo.addEventListener("input", (e) =>{
            e.target.value = formatInput(e.target.value);
        });
    };

    if (marcaVeiculo) {
        marcaVeiculo.addEventListener("input", (e) =>{
            e.target.value = formatInput(e.target.value);
        });
    };

    formOS.addEventListener("submit", (evento) => {
        evento.preventDefault();

        const clientValor = nomeClient.value;
        const cpfCnpjValor = cpfCnpjClient.value;
        const contatoValor = contatoClient.value;
        const marcaValor = marcaVeiculo.value;
        const modelValor = modelVeiculo.value;
        const placaValor = placaVeiculo.value;
        const defeitoValor = defeitoVeiculo.value;

        const idUnicoOS = idOs();
        const idClientUnico = idCliente();
        const idVeiculoUnico = idVeiculo();

        const validaOs = carregaOs.some((osExiste) => osExiste.placaValor === placaValor);
        const checaCpf = carregaClient.find((cpf) => cpf.cpfCnpjValor === cpfCnpjValor);

        if (validaOs) return alert("Já possui uma OS aberta para esse veiculo");

        let idUserCadastrado;

        if (checaCpf) {

            idUserCadastrado = checaCpf.id;

        } else {

            idUserCadastrado = idClientUnico;

            const newClient = { id: idUserCadastrado, clientValor, cpfCnpjValor, contatoValor, status: "Ativo" };

            carregaClient.push(newClient);
        };

        const newOsForm = { id: idUnicoOS, idUserCadastrado, idVeiculoUnico, placaValor, dataCriacao: dataDeCriacao(), status: "Aberto" };
        const newVeiculo = { id: idVeiculoUnico, idUserCadastrado, marcaValor, modelValor, placaValor, defeitoValor, status: "Ativo" };
        
        carregaOs.push(newOsForm);
        carregaVeiculo.push(newVeiculo);

        saveOs(carregaOs);
        saveCliente(carregaClient);
        saveVeiculo(carregaVeiculo);

        formOS.reset();

        alert("OS criada com sucesso");

        window.location.reload();
    }
    )
};


confgOS();