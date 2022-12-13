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

    const existe = itens.find(elemento => elemento.nome === nome.value);

    // Para criar e salvar no localStorage
    const itemAtual = {
        "nome": nome.value,
        "quantidade": quantidade.value
    }


    // Condição para conferir se o elemento existe ou não
    if (existe) {
        itemAtual.id = existe.id

        atualizaElemento(itemAtual);

        itens[itens.findIndex(elemento => elemento.id === existe.id)] = itemAtual


    } else {
        itemAtual.id = itens[itens.length - 1] ? (itens[itens.length - 1]).id + 1 : 0;

        criaElemento(itemAtual);

        itens.push(itemAtual);
    }


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
    numeroItem.dataset.id = item.id
    novoItem.appendChild(numeroItem);

    novoItem.innerHTML += item.nome

    novoItem.appendChild(botaoDeleta(item.id))

    lista.appendChild(novoItem);
}

// Função para atualizar o elemento. 
function atualizaElemento(item) {
    document.querySelector("[data-id='" + item.id + "']").innerHTML = item.quantidade;
}

function botaoDeleta(id) {
    const elementoBotao = document.createElement("button");
    elementoBotao.innerText = "X"

    elementoBotao.addEventListener("click", function () {
        deletaElemento(this.parentNode, id)
    })

    return elementoBotao
}

function deletaElemento(tag, id) {
    tag.remove()

    // remover um item do array
    itens.splice(itens.findIndex(elemento => elemento.id === id), 1)

    //  escrever no localStorage
    localStorage.setItem("itens", JSON.stringify(itens));

}