const loadUser = () => {
    const dados = localStorage.getItem("db_users");
    if (!dados || dados === "undefined" || dados === "null") {
        return [];
    }
    return JSON.parse(dados);
};

const saveUser = (user) => {
    localStorage.setItem("db_users", JSON.stringify(user))
};

const rendeUser = () => {

    const tabelaUser = document.getElementById("tbodyUsers");

    if (!tabelaUser) return;

    tabelaUser.innerHTML = "";

    const usuario = loadUser();

    console.log(usuario);

    usuario.forEach(usuario => {

        const novaLinha = document.createElement("tr");

        novaLinha.innerHTML = `
        <tr class="tr_el">
            <td class="td_cell" >${usuario.id}</td>
            <td class="td_cell" >${usuario.nomeValor}</td> 
            <td class="td_cell" >${usuario.saveEmail}</td>
            <td class="td_cell" >${usuario.senhaValor}</td>
            <td class="td_cell" >${usuario.status}</td>
            <td><button class="button_table" type="button" data-id="${usuario.id}">Delete</button></td>
        <tr/>
        `;

        tabelaUser.appendChild(novaLinha);
    });

    if (tabelaUser) {

        tabelaUser.addEventListener("click", (evento) => {
            if (evento.target.classList.contains("button_table")) {
                const idUsuario = Number(evento.target.getAttribute("data-id"));

                let usuario = loadUser();

                usuario = usuario.filter(usuario => usuario.id !== idUsuario);

                console.log(usuario);

                saveUser(usuario);

                rendeUser()

                console.log("usuário deletado")
            }
        });
    };

    const totalFoot = document.getElementById("totalUser");

    totalFoot.innerText = usuario.length;

};

rendeUser()