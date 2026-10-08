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

    cpfCnpjClient.addEventListener("input", (evento) => {
        let valor = evento.target.value.replace(/\D/g, '');

        valor = valor.replace(/(\d{3})(\d)/, '$1.$2');
        valor = valor.replace(/(\d{3})(\d)/, '$1.$2');
        valor = valor.replace(/(\d{3})(\d{1,2})$/, '$1-$2');

        evento.target.value = valor;
    });

    contatoClient.addEventListener("input", (evento) => {
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

    const dataDeCriacao = () => {
        const agora = new Date();

        return agora.toLocaleDateString('pt-PT', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const idOs = () => {
        const alfabeto = "ABCDEFGHIJKLMNOPQRSTUVXWIZ"

        const letra1 = alfabeto.charAt(Math.floor(Math.random() * alfabeto.length));
        const letra2 = alfabeto.charAt(Math.floor(Math.random() * alfabeto.length));

        const numero = Math.floor(100 + Math.random() * 90000);

        return `OS-${letra1}${letra2}${numero}`
    };

    const idCliente = () => {
        const alfabeto = "ABCDEFGHIJKLMNOPQRSTUVXWIZ"

        const letra1 = alfabeto.charAt(Math.floor(Math.random() * alfabeto.length));
        const letra2 = alfabeto.charAt(Math.floor(Math.random() * alfabeto.length));

        const numero = Math.floor(100 + Math.random() * 9000000000);

        return `CL-${letra1}${letra2}${numero}`
    };

    const idVeiculo = () => {
        const alfabeto = "ABCDEFGHIJKLMNOPQRSTUVXWIZ"

        const letra1 = alfabeto.charAt(Math.floor(Math.random() * alfabeto.length));
        const letra2 = alfabeto.charAt(Math.floor(Math.random() * alfabeto.length));

        const numero = Math.floor(100 + Math.random() * 90000000);

        return `VE-${letra1}${letra2}${numero}`
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

        console.log(checaCpf);

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
        const newVeiculo = { id: idVeiculoUnico, idUserCadastrado, marcaValor, modelValor, placaValor, defeitoValor };
        
        carregaOs.push(newOsForm);
        carregaVeiculo.push(newVeiculo);

        saveOs(carregaOs);
        saveCliente(carregaClient);
        saveVeiculo(carregaVeiculo);

        formOS.reset();

        alert("OS criada com sucesso");

        //window.location.reload();
    }
    )
};


confgOS();