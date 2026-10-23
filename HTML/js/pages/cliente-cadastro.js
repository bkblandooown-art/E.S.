const carregaCliente = loadClient();
const carregaVeiculo = loadVeiculo();

const criaCliente = () => {

    const btnCriaClient = document.getElementById("btnClientSalvar");
    const formCriaClient = document.getElementById("clientForm");

    if(!formCriaClient) return;

    const inptNome = document.getElementById("inputNome");
    const inptDocument = document.getElementById("inputCpfCnpj");
    const inptEmail = document.getElementById("inputEmail");
    const inptContato = document.getElementById("inputContato");
    const inptAniversario = document.getElementById("inputData");

    if (inptDocument) {
        inptDocument.addEventListener("input", (e) => {
            e.target.value = maskDocument(e.target.value);
        });
    };

    if (inptContato) {
        inptContato.addEventListener("input", (e) => {
            e.target.value = maskContato(e.target.value);
        });
    };

    if (formCriaClient) {
        
        formCriaClient.addEventListener("submit", (evento) => {
        evento.preventDefault();

            if (btnClientSalvar) {

            const newClientValue = Object.fromEntries(new FormData(evento.target));

            console.log(newClientValue)
        };
    });
};
};
criaCliente();