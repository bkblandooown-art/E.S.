const loadUser = () => {
    const dados = localStorage.getItem("db_users");
    if (!dados || dados === "undefined" || dados === "null") {
        return [];
    }
    return JSON.parse(dados);
};

const validaUser = () => {

    loadUser()

    const loginButton = document.getElementById("btnSubmit");

    loginButton.addEventListener("submit", (evento) => {

    const emailLogin = document.getElementById("inputEmail").value;
    const senhaLogin = document.getElementById("inputPassword").value;

    const findLogin = loadUser.includes()


    if (emailLogin === saveEmail && senhaLogin === senhaValor) {


        
    };
});

 

};

validaUser()