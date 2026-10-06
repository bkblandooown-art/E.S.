const criaOs = loadOs();
const criaClient = loadClient();
const criaVeiculo = loadVeiculo();

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

        const validaPlaca = criaVeiculo.some((placa) => placa.placaValor === placaValor);

        console.log(validaPlaca)

        const checaCpf = criaClient.find((cpf) => cpf.cpfCnpjValor === cpfCnpjValor);

        console.log(checaCpf)

        if (validaPlaca) return alert("Veiculo com placa " + placaValor + " já existe");

        const idUserCadastrado = checaCpf.id;

        const newOsForm = { id: idUnicoOS, idClientUnico, idVeiculoUnico, dataCriacao: dataDeCriacao(), status: "Aberto" };

        const newClient = { id: idClientUnico, clientValor, cpfCnpjValor, contatoValor, status: "Ativo" };

        const newVeiculo = () => {

            if (checaCpf) {

                return { id: idVeiculoUnico, idUserCadastrado, marcaValor, modelValor, placaValor, defeitoValor }

            } else {

                return { id: idVeiculoUnico, idClientUnico, marcaValor, modelValor, placaValor, defeitoValor }
            }
        };
        // criar um novo DB para veículo e relacionar ele ao cliente atravez da placa ou ID
        // Separar os dados de salvamento dentro da OS para que cada dado vá para um DB diferente        

        criaClient.push(newClient);

        criaVeiculo.push(newVeiculo);

        criaOs.push(newOsForm);

        saveOs(criaOs);

        saveVeiculo(criaVeiculo);

        saveCliente(criaClient);

        formOS.reset();

        alert("OS criada com sucesso");

        //window.location.reload();

        console.log(newOsForm);
    }
    )
};


confgOS();