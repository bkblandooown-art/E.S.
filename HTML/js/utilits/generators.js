const idOs = () => {
    const alfabeto = "ABCDEFGHIJKLMNOPQRSTUVXWIZ"

    const letra1 = alfabeto.charAt(Math.floor(Math.random() * alfabeto.length));
    const letra2 = alfabeto.charAt(Math.floor(Math.random() * alfabeto.length));

    const numero = Math.floor(100 + Math.random() * 90000);

    return `OS-${letra1}${letra2}${numero}`
};

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