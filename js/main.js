const form = document.getElementById("novoItem");
const lista = document.getElementById("lista");
const itens = []

// Função para acontecer a criação do novo item
form.addEventListener("submit", (evento) => {
    evento.preventDefault()

    const nome = evento.target.elements['nome']
    const quantidade = evento.target.elements['quantidade']

    criaElemento(nome.value, quantidade.value);

    nome.value = ""
    quantidade.value = ""
})


// Função para criar um novo item
function criaElemento(nome, quantidade) {

    const novoItem = document.createElement('li');
    novoItem.classList.add("item")

    const numeroItem = document.createElement('strong');
    numeroItem.innerHTML = quantidade

    novoItem.appendChild(numeroItem);
    novoItem.innerHTML += nome

    lista.appendChild(novoItem);

    const intemAtual = {
        "nome": nome,
        "quantidade": quantidade
    }

    itens.push(intemAtual);
    localStorage.setItem("item", JSON.stringify(intemAtual));
}