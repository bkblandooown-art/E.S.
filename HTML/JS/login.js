const validaUser = () => {

    const loginForm = document.getElementById("loginForm");

    if (!loginForm) return;

    loginForm.addEventListener("submit", (evento) => {
        evento.preventDefault()

        const usuario = loadUser();

        const emailLogin = document.getElementById("inputEmail").value;
        const senhaLogin = document.getElementById("inputPassword").value;

        const buscaDados = usuario.find((achaUser) => achaUser.saveEmail === emailLogin);

        if (!buscaDados) {

            loginForm.reset();

            alert("email não encontrado")

            return;
        };

        if (buscaDados.senhaValor === senhaLogin) {

            alert("login realizado")

            window.location.href = "tabelaUsers.html";

            return;
        };

        loginForm.reset();

        alert("Dados incorreto");
        
    });
};

validaUser();

