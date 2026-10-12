const loadVeiculo = () =>{
    const dadosVeiculo = localStorage.getItem("db_Veiculos");
    if (!dadosVeiculo || dadosVeiculo === "undefined" || dadosVeiculo === "null"){
        return[];
    }
    
    return JSON.parse(dadosVeiculo);
};

const saveVeiculo = (veiculo) => {
    localStorage.setItem("db_Veiculos", JSON.stringify(veiculo))
};