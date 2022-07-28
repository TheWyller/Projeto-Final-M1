function pesquisaPorTag(event){
    let array = [];
    if (event.innerText === 'Todos'){
        criaProdutoNaVitrine(arrayProducts);
    }else{
        for(let i = 0 ; i < arrayProducts.length ; i++){
            if(event.innerText === arrayProducts[i].tag){
                array.push(arrayProducts[i])
            }
        }
        criaProdutoNaVitrine(array);
    }
    limparBotao(event)
    event.classList.add('active')
}


function limparBotao(){
    let tag = document.getElementsByClassName('btn')
    for(let i = 0 ; i < tag.length; i++){
        tag[i].classList.remove('active');
    }
}


function pesquisaPorText(){
    let pesquisaText = document.getElementById('pesquisa')
    let array = [];
    for(let i = 0 ; i < arrayProducts.length; i++){
        let tagLower = arrayProducts[i].tag.toLowerCase();
        let tituloLower = arrayProducts[i].titulo.toLowerCase();
        let descricaoLower = arrayProducts[i].descricao.toLowerCase();
        let palavra = pesquisaText.value.toLowerCase();
        if(tagLower.includes(palavra) || tituloLower.includes(palavra) || descricaoLower.includes(palavra)){
            array.push(arrayProducts[i])
        }
    }
    criaProdutoNaVitrine(array);
    limparBotao();
    pesquisaText.value = ''
}
