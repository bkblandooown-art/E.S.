const loadUser = () => {
    const dados = localStorage.getItem("db_users");
    if (!dados || dados === "undefined" || dados === "null"){
        return [];
    }
    return JSON.parse(dados);
};

const saveUser = (user) => {
    localStorage.setItem("db_users", JSON.stringify(user))
};
