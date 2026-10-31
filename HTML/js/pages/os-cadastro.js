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

    const camposFormatados = [
        { elemento: cpfCnpjClient, formatador: maskDocument},
        { elemento: contatoClient, formatador: maskContato},
        { elemento: placaVeiculo, formatador: maskPlaca},
        { elemento: marcaVeiculo, formatador: formatInput},
        { elemento: modelVeiculo, formatador: formatInput},
        
    ];

    camposFormatados.forEach (({elemento, formatador}) => {

        if (!elemento) return;

       elemento.addEventListener("input", (e) =>{
        e.target.value = formatador(e.target.value);
       });
    });
    
    let clienteAtivo = null;

    cpfCnpjClient.addEventListener("blur", (e) => {

        const checaCpf = carregaClient.find((cpf) => cpf.cpfCnpjValor === e.target.value);

        console.log(checaCpf);

        if (checaCpf) {

            nomeClient.value = checaCpf.clientValor;
            nomeClient.readOnly = true;
            contatoClient.value = checaCpf.contatoValor;
            contatoClient.readOnly = true;
            clienteAtivo = checaCpf.id;
            console.log(clienteAtivo)

        } else {
            nomeClient.readOnly = false;
            contatoClient.readOnly = false
        };
    });

    placaVeiculo.addEventListener("blur", (e) => {

        console.log(clienteAtivo)

        const placaDigitada = e.target.value.trim();

        if (!placaDigitada) return;

        if (clienteAtivo === "") {
            alert("Necessario preencher CPF/CNPJ");
            e.target.value = "";
            return;
        }

        const checaVeiculo = carregaVeiculo.find((v) => v.placaValor === placaDigitada);

        if (checaVeiculo && checaVeiculo.idUserCadastrado !== clienteAtivo.id) {
            alert("Essa placa está cadastrada para outro cliente");
            e.target.value = "";
            return;
        }
        if (checaVeiculo) {

            marcaVeiculo.value = checaVeiculo.marcaValor;
            marcaVeiculo.readOnly = true;

            modelVeiculo.value = checaVeiculo.modelValor;
            modelVeiculo.readOnly = true;

            return
        }

        marcaVeiculo.readOnly = false;
        modelVeiculo.readOnly = false;
        marcaVeiculo.value = "";
        modelVeiculo.value = "";
    });


    formOS.addEventListener("submit", (evento) => {
        evento.preventDefault();

        const clientValor = nomeClient.value;
        const cpfCnpjValor = cpfCnpjClient.value;
        const contatoValor = contatoClient.value;
        const marcaValor = marcaVeiculo.value;
        const modelValor = modelVeiculo.value;
        const placaValor = placaVeiculo.value;
        const defeitoValor = defeitoVeiculo.value;



        const validaOs = carregaOs.some((osExiste) => osExiste.placaValor === placaValor && osExiste.status === "Aberto");

        console.log(validaOs)

        if (validaOs) return alert("Já possui uma OS aberta para esse veiculo");

        const checaCpf = carregaClient.find((cpf) => cpf.cpfCnpjValor === cpfCnpjValor);

        let idUserCadastrado;

        if (checaCpf) {

            idUserCadastrado = checaCpf.id;

        } else {

            idUserCadastrado = idCliente();

            const newClient = { id: idUserCadastrado, clientValor, cpfCnpjValor, contatoValor, status: "Ativo" };

            carregaClient.push(newClient);
        };

        const checaVeiculo = carregaVeiculo.find((v) => v.placaValor === placaValor);

        let veiculoCadastradoPlaca;

        if (checaVeiculo) {

            veiculoCadastradoPlaca = checaVeiculo.id

        } else {

            veiculoCadastradoPlaca = idVeiculo();

            const newVeiculo = { id: veiculoCadastradoPlaca, idUserCadastrado, marcaValor, modelValor, placaValor, status: "Ativo" };

            carregaVeiculo.push(newVeiculo);
        };

        const newOsForm = { id: idOs(), idUserCadastrado, veiculoCadastradoPlaca, placaValor, defeitoValor, dataCriacao: dataDeCriacao(), status: "Aberto" };

        carregaOs.push(newOsForm);

        saveOs(carregaOs);
        saveCliente(carregaClient);
        saveVeiculo(carregaVeiculo);

        formOS.reset();

        alert("OS criada com sucesso");

        window.location.reload();
    });
};

confgOS();