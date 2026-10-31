
//mascara de CPF e CNPJ.
const maskDocument = (valor) => {
    let limpo = String(valor).replace(/\D/g, '');

        limpo = limpo.replace(/(\d{3})(\d)/, '$1.$2');
        limpo = limpo.replace(/(\d{3})(\d)/, '$1.$2');
        limpo = limpo.replace(/(\d{3})(\d{1,2})$/, '$1-$2');

        return limpo;
    };

const maskEmail = (valor) => {
    let limpo = String(valor).toLowerCase;

    return limpo
};

const maskContato = (valor) => {
    let limpo = String(valor).replace(/\D/g, '');

        if (limpo.length > 11) limpo = limpo.slice(0, 11);

        if (limpo.length > 10) {
            limpo = limpo.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3');
        } else if (limpo.length > 6) {
            limpo = limpo.replace(/^(\d{2})(\d{4})(\d{0,4})$/, '($1) $2-$3');
        } else if (limpo.length > 2) {
            limpo = limpo.replace(/^(\d{2})(\d{0,5})$/, '($1) $2');
        } else if (limpo.length > 0) {
            limpo = limpo.replace(/^(\d{0,2})$/, '($1');
        }

        return limpo;
}

const maskPlaca = (valor) => {
    let limpo = String(valor).toUpperCase().replace(/[^A-Z0-9]/g, '');
    if (limpo.length > 7) limpo = limpo.slice(0, 7);

    // Se tiver mais de 3 letras, aplica o traço do padrão antigo caso não seja Mercosul
    if (limpo.length > 3) {
        limpo = limpo.replace(/^([A-Z]{3})(\d{4})$/, '$1-$2');
    }

    return limpo;
};

const formatInput = (valor) => {
    let limpo = String(valor).toUpperCase().replace();
    return limpo;
};
