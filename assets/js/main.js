
const arrayCarrinho =[]

function carrinhoVazio (){
    let caixa = document.createElement('div');
    caixa.id= 'carrinhoVazio'
    let titulo = document.createElement('h2');
    titulo.innerText ='Carrinho vázio'
    let p = document.createElement('p');
    p.innerText ='Adicione itens'
    document.getElementById('containerCarrinho').appendChild(caixa);
    document.getElementById('carrinhoVazio').appendChild(titulo);
    document.getElementById('carrinhoVazio').appendChild(p);
}

carrinhoVazio ()

function itemNaoEncontrado(){
    let caixa = document.createElement('li');
    caixa.id = 'itemNaoEncontrado';
    let texto1 = document.createElement('h2');
    texto1.innerText = 'Item não encontrado!!!'
    let texto2 = document.createElement('h2');
    texto2.innerHTML = '&#128517;'
    
    document.getElementById('vitrine').appendChild(caixa);
    document.getElementById('itemNaoEncontrado').appendChild(texto1);
    document.getElementById('itemNaoEncontrado').appendChild(texto2);
}


function criaProdutoNaVitrine(array){
    let vitrine = document.getElementById('vitrine')
    vitrine.innerHTML = '';

    for(let i = 0; i < array.length; i++){
        let produto = document.createElement('li');
        produto.classList.add('produto');
        produto.id = array[i].id

        let imgCaixa = document.createElement('div');
        imgCaixa.classList.add('imgCaixa');

        let img = document.createElement('img');
        img.src = arrayProducts[produto.id].src;
        img.alt = arrayProducts[produto.id].alt;

        let info = document.createElement('section');
        info.classList.add('info');

        let tag = document.createElement('span');
        tag.innerText = arrayProducts[produto.id].tag;

        let titulo = document.createElement('h2');
        titulo.innerText = arrayProducts[produto.id].titulo;

        let descricao = document.createElement('p');
        descricao.classList.add('descricao');
        descricao.innerText = arrayProducts[produto.id].descricao;

        let valor = document.createElement('p');
        valor.classList.add('valor');
        valor.innerText = 'R$ ' + arrayProducts[produto.id].preco;


        let botao = document.createElement('button');
        botao.classList.add('addCart');
        botao.innerText = 'Adicionar ao carrinho';

        document.getElementById('vitrine').appendChild(produto);
        document.getElementsByClassName('produto')[i].appendChild(imgCaixa);
        document.getElementsByClassName('imgCaixa')[i].appendChild(img);
       
        if(array.length < 3){
            document.getElementsByClassName('produto')[0].classList.add('produtoMargin')
        }


        document.getElementsByClassName('produto')[i].appendChild(info);
        document.getElementsByClassName('info')[i].appendChild(tag);
        document.getElementsByClassName('info')[i].appendChild(titulo);
        document.getElementsByClassName('info')[i].appendChild(descricao);
        document.getElementsByClassName('info')[i].appendChild(valor);
        document.getElementsByClassName('info')[i].appendChild(botao);
    }
    if(array.length === 0){
        itemNaoEncontrado()
    }
}

criaProdutoNaVitrine(arrayProducts);


function reset(array){
    if(document.getElementById('carrinhoVazio') !== null){
        document.getElementById('carrinhoVazio').remove();
    }
    
    if(array[0] !== undefined ){
        for(let i = 0 ; i < array.length; i++){
            
            let removeItem = document.getElementsByClassName('item');
            if(removeItem[0] !== undefined){
                removeItem[0].remove(); 
            }    
        }

        const removeResumo = document.getElementsByClassName('resumo')[0];
        if(removeResumo !== undefined){
            removeResumo.remove(); 
        }
    }
}



function adicionaCarrinho (array){
    let count = 0;
    let soma = 0;
     
    reset(array);

    for(let i = 0; i<array.length; i++){

        let caixaExterna = document.createElement('section');
        caixaExterna.classList.add('item');
        caixaExterna.id = 'item'+ array[i].id

        let imgCaixa = document.createElement('div');
        imgCaixa.classList.add('imgCart');
        let img =document.createElement('img');
        img.src = array[i].src;
        img.alt = array[i].alt;

        let textoCaixa = document.createElement('div');
        textoCaixa.classList.add('textCart');
        let titulo = document.createElement('h3');
        titulo.innerText = array[i].titulo;
        let valor = document.createElement('p');
        valor.innerText ='R$ '+ array[i].preco;
        
        let botao = document.createElement('button');
        botao.classList.add('removeCart');
        botao.innerText = 'Remover carrinho';

        document.getElementById('containerCarrinho').appendChild(caixaExterna);
        document.getElementsByClassName('item')[i].appendChild(imgCaixa);
        document.getElementsByClassName('imgCart')[i].appendChild(img);

        document.getElementsByClassName('item')[i].appendChild(textoCaixa);
        document.getElementsByClassName('textCart')[i].appendChild(titulo);
        document.getElementsByClassName('textCart')[i].appendChild(valor);
        document.getElementsByClassName('textCart')[i].appendChild(botao);

        count++;
        soma += array[i].preco
    }


    let resumo = document.createElement('section');
    resumo.classList.add('resumo');

    let quantidadeText = document.createElement('p');
    quantidadeText.classList.add('texto');
    quantidadeText.innerText ='Quantidade:'

    let quantidadeNum = document.createElement('p');
    quantidadeNum.classList.add('num')
    quantidadeNum.innerText = count

    let valorText = document.createElement('p');
    valorText.classList.add('textoValue')
    valorText.innerText = 'Total:'

    let valorNum = document.createElement('p');
    valorNum.classList.add('value')
    valorNum.innerText = soma

    
    
    if(array.length !== 0){
        document.getElementById('containerCarrinho').appendChild(resumo);
        document.getElementsByClassName('resumo')[0].appendChild(quantidadeText);
        document.getElementsByClassName('resumo')[0].appendChild(quantidadeNum);
        document.getElementsByClassName('resumo')[0].appendChild(valorText);
        document.getElementsByClassName('resumo')[0].appendChild(valorNum);
    }else{
        document.getElementsByClassName('resumo')[0].remove();
        carrinhoVazio ()
    }
}


function addNoCarrinho(input){
    let id = input.parentNode.parentNode.id;
    arrayCarrinho.push(arrayProducts[id])
    adicionaCarrinho(arrayCarrinho)
}
function removeDoCarrinho(input){
    let id = input.parentNode.parentNode.id;
    let item = input.parentNode.parentNode;
    let index = arrayCarrinho.indexOf(arrayProducts[parseInt(id.slice(4))])
    arrayCarrinho.splice(index,1)
    item.remove();
    adicionaCarrinho(arrayCarrinho)
    
}



function identificaEvento(event){
    const itemClick = event.target;
    if(itemClick.className === 'addCart'){
        addNoCarrinho(itemClick)
    }else if(itemClick.className === 'removeCart'){
        removeDoCarrinho(itemClick)
    }else if(itemClick.className === 'btn'){
        pesquisaPorTag(itemClick)
    }else if (itemClick.id === 'pesquisar'){
        pesquisaPorText();
    }

}

let vitrine = document.getElementById('vitrine')
let carrinho = document.getElementById('containerCarrinho')
let filtro = document.getElementById('filtro')
let btnPesquisar = document.getElementById('pesquisar')
let pesquisarEnter = document.getElementById('pesquisa')

vitrine.addEventListener('click',identificaEvento)
carrinho.addEventListener('click',identificaEvento)
filtro.addEventListener('click',identificaEvento)
btnPesquisar.addEventListener('click',identificaEvento)
pesquisarEnter.addEventListener('keypress',function(event){
    if(event.keyCode === 13){
        document.getElementById('pesquisar').click();
    }
})