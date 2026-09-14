const confirmaSenha = (senhaCadastro, confSenha) => senhaCadastro === confSenha;

const cadastro = () => {
    const formCadastro = document.getElementById("formCad");

    if (!formCadastro) return

    formCadastro.addEventListener("submit", function (evento) {
        evento.preventDefault();

            const emailUser = document.getElementById("inputEmail").value;
            const senhaCadastro = document.getElementById("inputPassword").value;
            const confSenha = document.getElementById("inputConfirmaPassword").value;


            if (!confirmaSenha(senhaCadastro, confSenha)) {
                confSenha.addEventListener(){}('As senhas não coincidem');
                return;
            }
            
            const newUser = {
                id: Date.now(),
                email: emailUser,
                senha: senhaCadastro,
                status: 'Active'
            };

            console.log("cadastro realizado com sucesso do user:", emailUser)
        
    });

};

cadastro()

