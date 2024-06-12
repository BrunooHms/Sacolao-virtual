let pProduto;
let pPreco;
let totalProduto;
let inputNumero;
let precoTotal;
let totalProdutosNoModal
let quantidadeMercadoria = 12

const btnLimparCarrinho = document.querySelector('.botao-limpar')
const btnCarrinho = document.querySelector('#botaoCarrinho')
const fecharModal = document.querySelector('#closeModalBtn')
const btnAdcProduto = document.querySelectorAll('.btn-adc-produto')
const btnRemProduto = document.querySelectorAll('.btn-rem-produto')
const btnFinalCompra = document.querySelector('#finalizarCompra')

let contadorCarrinho = document.querySelector('.contagem-carrinho')
let totalModal = document.querySelector('.total-modal')
let divProdutos = document.querySelector('.div-produtos')

let contadores = Array.from({ length: quantidadeMercadoria }, () => 0)
let contadoresCarrinho = Array.from({ length: quantidadeMercadoria }, () => 0)
let produtosArray = []
let totalModalArray = []
let totalProdutos = []
let paragrafosPrecos = []

const produtosCarrinho = [];
const inputsNumeros = []

const precoProdutos = []
const quantidades = []

for (let i = 1; i <= quantidadeMercadoria; i++) {
    quantidades.push(document.getElementById('quantidadeProduto' + i))
}

for (let i = 1; i <= quantidadeMercadoria; i++) {
    precoProdutos.push(document.querySelector('.preco-produto' + i))
}

document.addEventListener('input', function (e) {
    el = e.target

    inputsNumeros.forEach((btn, index) => {
        if (el === btn) {
            valoresInputsNumber = inputsNumeros[index].value;

            quantidades[index].innerHTML = valoresInputsNumber;

            contadores[index] = quantidades[index].textContent;

            if (parseFloat(inputsNumeros[index].value) === 0 && produtosCarrinho[index]) {
                produtosCarrinho[index].remove()
                contadoresCarrinho[index] = 0
                contadorCarrinho.innerHTML = contadoresCarrinho.reduce(somaArray)
            }

            inputsNumeros[index].value = contadores[index]

            atualizarPreco(index)

        }
    })
})

document.addEventListener('click', function (e) {
    el = e.target

    btnAdcProduto.forEach((btn, index) => {
        if (el === btn) {
            contadores[index]++
            quantidades[index].innerHTML = contadores[index]
            contadoresCarrinho[index] = 1
            contadorCarrinho.innerHTML = contadoresCarrinho.reduce(somaArray)

            if (contadores[index] === 1) {
                produtosArray = (el.parentNode.textContent.split(/\s+/))

                pProduto = criarPProdutos()

                pProduto.appendChild(nomeProduto(produtosArray[0]))

                inputNumero = criaInputNumber()

                pProduto.appendChild(inputNumero)

                pProduto.appendChild(nomeProduto(produtosArray[2]))

                pPreco = criaPPreco()

                pPreco.appendChild(nomeProduto(precoProdutos[index].textContent))

                pProduto.appendChild(pPreco)

                divProdutos.appendChild(pProduto)

                inputsNumeros[index] = inputNumero
                produtosCarrinho[index] = pProduto
                paragrafosPrecos[index] = pPreco
            }

            inputsNumeros[index].value = contadores[index]

            atualizarPreco(index)

            return
        }
    })

    btnRemProduto.forEach((btn, index) => {
        if (el === btn) {
            contadores[index] = Math.max(0, contadores[index] - 1)
            quantidades[index].innerHTML = contadores[index];

            if (contadores[index] === 0) {
                contadoresCarrinho[index] = Math.max(0, contadoresCarrinho[index] - 1)
            }

            if (contadores[index] === 0 && produtosCarrinho[index]) {
                produtosCarrinho[index].remove()
            }

            contadorCarrinho.innerHTML = contadoresCarrinho.reduce(somaArray)

            inputsNumeros[index].value = contadores[index]

            atualizarPreco(index)

            return
        }
    })

    totalModal.innerHTML = `R$ ${totalProdutos.reduce(somaArray).toFixed(2)}`

})

btnLimparCarrinho.addEventListener('click', function () {
    contadores = Array.from({ length: quantidadeMercadoria }, () => 0)
    contadoresCarrinho = Array.from({ length: quantidadeMercadoria }, () => 0)
    totalProdutos = Array.from({ length: quantidadeMercadoria }, () => 0)

    let paragrafos = divProdutos.getElementsByTagName('p');
    while (paragrafos.length > 0) {
        divProdutos.removeChild(paragrafos[0])
    }

    contadorCarrinho.innerHTML = '0'

    quantidades.forEach((elemento, index) => {
        elemento.innerHTML = contadores[index]
    })

    precoTotal = 0
    totalModal.innerHTML = `R$ 0.00`
})

btnFinalCompra.addEventListener('click', function () {
    if (precoTotal === undefined || precoTotal == 0) {
        alert(`Impossivel fazer compras nesse valor`)
    } else {
        alert(`Sua compra no valor de R$ ${precoTotal} foi efeutada com sucesso !`)
    }
})

function atualizarPreco(index){

    precoConvertido = parseFloat(precoProdutos[index].textContent.replace(',', '.')).toFixed(2)
    totalProdutos[index] = parseFloat(inputsNumeros[index].value) * parseFloat(precoConvertido)
    paragrafosPrecos[index].innerHTML = totalProdutos[index].toFixed(2)
    precoTotal = totalProdutos.reduce(somaArray).toFixed(2)
    totalModal.innerHTML = `R$ ${precoTotal}`

}

function criarPProdutos() {
    let pProduto = document.createElement('p')
    pProduto.className = 'paragrafoProduto'
    return pProduto
}

function criaPPreco() {
    let pPreco = document.createElement('p')
    pPreco.className = 'paragrafoPreco'
    return pPreco
}

function criaInputNumber() {
    let inputNumber = document.createElement('input')
    inputNumber.type = 'number'
    inputNumber.className = 'inputNumberProdutos'
    inputNumber.setAttribute('min', '0')
    return inputNumber
}

function nomeProduto(nomeDoProduto) {
    let nome = document.createTextNode(nomeDoProduto)
    return nome
}

const somaArray = (total, valor) => {
    return total + valor
}

btnCarrinho.addEventListener('click', function () {
    modal.style.display = 'block'
})

fecharModal.addEventListener('click', function () {
    modal.style.display = 'none'
})

document.addEventListener('click', function (e) {
    if (e.target === modal) {
        modal.style.display = 'none'
    }
})


