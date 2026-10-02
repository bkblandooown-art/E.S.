const loadOs = () => {
    const dadosOs = localStorage.getItem("db_Os");
    if (!dadosOs || dadosOs === "undefined" || dadosOs === "null") {
        return [];
    }
    return JSON.parse(dadosOs);
};

const saveOs = (criaOS) => {
    localStorage.setItem("db_Os", JSON.stringify(criaOS));
};