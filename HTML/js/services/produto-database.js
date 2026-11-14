const loadProdutos = () =>{
    const dadosProdutos  = localStorage.getItem("db_produtos");
    if (!dadosProdutos || dadosProdutos === null || dadosProdutos === undefined){
        return [];
    };
    return JSON.parse(dadosProdutos);
};

const saveProdutos = (criaProdutos) =>{
    localStorage.setItem("db_produtos", JSON.stringify(criaProdutos))
};