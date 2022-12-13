// Operador logico para retornar com os dados salvos
const form = document.getElementById("novoItem");
const lista = document.getElementById("lista");
const itens = JSON.parse(localStorage.getItem("itens")) || [];


// Uso do  forEach para todos os itens na lista
itens.forEach(elemento => {
    criaElemento(elemento)
});

// addEventListener refatorada para receber as outras funções
form.addEventListener("submit", (evento) => {
    evento.preventDefault()

    const nome = evento.target.elements['nome']
    const quantidade = evento.target.elements['quantidade']

    // Para criar e salvar no localStorage
    const intemAtual = {
        "nome": nome.value,
        "quantidade": quantidade.value
    }


    criaElemento(intemAtual);

    itens.push(intemAtual);
    localStorage.setItem("itens", JSON.stringify(itens));

    nome.value = ""
    quantidade.value = ""

})


// Função refatorada para criar um novo item
function criaElemento(item) {

    const novoItem = document.createElement('li');
    novoItem.classList.add("item")

    const numeroItem = document.createElement('strong');
    numeroItem.innerHTML = item.quantidade
    novoItem.appendChild(numeroItem);

    novoItem.innerHTML += item.nome

    lista.appendChild(novoItem);
}