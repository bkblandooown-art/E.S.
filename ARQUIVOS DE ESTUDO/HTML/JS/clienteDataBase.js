const loadClient = () =>{
    const dadosCliente = localStorage.getItem("db_clientes");
    if (!dadosCliente || dadosCliente === "undefined" || dadosCliente === "null"){
        return[];
    }
    
    return JSON.parse(dadosCliente);
};

const saveCliente = (cliente) => {
    localStorage.setItem("db_clientes", JSON.stringify(cliente))
};