const validaEmail = (email) => { return email.endsWith(".com") || email.endsWith(".com.br")};

const validaSenhas = (senha, confirmaSenha) => senha === confirmaSenha;

console.log(validaSenhas());


const configCadastro = () => {

    const formCadastro = document.getElementById("formCad");

    const email = document.getElementById("inputEmail");
    const senha = document.getElementById("inputPassword");
    const confirmaSenha = document.getElementById("inputConfirmaPassword");
    
    if (!formCadastro) return;
    
    email.addEventListener("input", (evento) => {
        inputEmail.classList.remove("input_err");
        return console.log("Estilo do Email resetado")
    });

    confirmaSenha.addEventListener("input", (evento) => {
        inputConfirmaPassword.classList.remove("input_err");
        return console.log("Estilo da Senha resetada")
    });

    formCadastro.addEventListener("submit", (evento) => {
        evento.preventDefault();
        
        //Capturar os dados do HTML/DOM
        const emailValor = email.value;
        const senhaValor = senha.value;
        const confirmaSenhaValor = confirmaSenha.value;
        
        if (!validaEmail(emailValor)) {
            inputEmail.classList.add("input_err");
            console.log("O email não é valido");
            return;
        };

        if (!validaSenhas(senhaValor, confirmaSenhaValor)) {
            inputConfirmaPassword.classList.add("input_err");
            console.log("senhas não coincidem");
            return;
        };

        const saveEmail = (emailValor.toLowerCase())

        const user = loadUser();

        const newUser = {id: Date.now(), emailValor, senhaValor, status: "Ativo"};

        user.push(newUser);

        saveUser(user);

        formCadastro.reset();

        console.log(newUser);

        alert("Cadastro realizado com sucesso.");
    })

};

configCadastro();