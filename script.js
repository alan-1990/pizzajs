let modalqt = 1;
let cart = [];
let modalKey = 0;
const c = (e)=>document.querySelector(e);
const cs = (e)=>document.querySelectorAll(e);


pizzaJson.map((item,index)=>{
    let pizzaItem = c('.models .pizza-item').cloneNode(true); // Clonando o pizza Item Html
    pizzaItem.setAttribute('data-key',index); // adicionando um id a cada pizza da tela, este id é o index do pizzas.js
    //preenchendo os campos a cada item
    pizzaItem.querySelector('.pizza-item--img img').src=item.img;
    pizzaItem.querySelector('.pizza-item--price').innerHTML=`R$  ${item.price.toFixed(2)}`;
    pizzaItem.querySelector('.pizza-item--name').innerHTML=item.name;
    pizzaItem.querySelector('.pizza-item--desc').innerHTML=item.description;

    pizzaItem.querySelector('a').addEventListener('click',(e)=>{
        e.preventDefault();
        let key= e.target.closest('.pizza-item').getAttribute('data-key');
        modalqt =1;
        modalKey=key;

        c('.pizzaBig img').src=pizzaJson[key].img;
        c('.pizzaInfo h1').innerHTML = pizzaJson[key].name;
        c('.pizzaInfo--desc').innerHTML =pizzaJson[key].description;
        c('.pizzaInfo--actualPrice').innerHTML =`R$  ${pizzaJson[key].price.toFixed(2)}`;
        c('.pizzaInfo--size.selected').classList.remove('selected');
        cs('.pizzaInfo--size').forEach((size,sizesIndex)=>{
            if (sizesIndex ==2){
                size.classList.add('selected');
            }
            size.querySelector('span').innerHTML =pizzaJson[key].sizes[sizesIndex];
        });
        c('.pizzaInfo--qt').innerHTML = modalqt;

        c('.pizzaWindowArea').style.opacity=0;
        c('.pizzaWindowArea').style.display='flex';
        setTimeout(()=>{
            c('.pizzaWindowArea').style.opacity=1;
        },200);

    });
    //Adicionando cada combo acima, até que complete todos os itens existentes no json.map linha
    c('.pizza-area').append(pizzaItem);
});

// trabalhando em eventos do modal, fora do map de pizzas
function fecharModal(){
    c('.pizzaWindowArea').style.opacity=0;
    setTimeout(()=>{
        c('.pizzaWindowArea').style.display= 'none';
    },500);
}

//reduzindo a quantidade desde que seja maior que 1
c('.pizzaInfo--qtmenos').addEventListener('click',()=>{
  if (modalqt>1){
      modalqt--;
      c('.pizzaInfo--qt').innerHTML = modalqt;
  }
});
//aumentando a quantidade de pizzas
c('.pizzaInfo--qtmais').addEventListener('click',()=>{
    modalqt++;
    c('.pizzaInfo--qt').innerHTML = modalqt;

});
//selecionando os tamanhos da pizza no modal
cs('.pizzaInfo--size').forEach((size,sizesIndex)=>{
   size.addEventListener('click',()=>{
       c('.pizzaInfo--size.selected').classList.remove('selected');
       size.classList.add('selected');
   });
});

//adicionando a função adicionar ao carrinho, com verificador de mesmo produto
c('.pizzaInfo--addButton').addEventListener('click', ()=>{
     let size = parseInt(c('.pizzaInfo--size.selected').getAttribute('data-key'));
    //criando um identificador para produtos iguais.
     let identificador = pizzaJson[modalKey].id+'@'+size;
     let key = cart.findIndex((item)=> item.identificador == identificador);
     if (key>-1){
        cart[key].qt += modalqt;
     }else {
         cart.push({
             identificador,
             id: pizzaJson[modalKey].id,
             size: size,
             qt: modalqt
         });
     }
    atualizarCarrinho();
    fecharModal();
})

c(".menu-openner").addEventListener('click',()=>{
    if(cart.length>0){
        c('aside').style.left = '0';
    }
});

c(".menu-closer").addEventListener('click',()=>{
    c('aside').style.left = '100vw';
});


function atualizarCarrinho (){
    c(".menu-openner span").innerHTML = cart.length;
    if(cart.length>0){
        c('aside').classList.add('show');
        c('.cart').innerHTML ='';

        let subtotal = 0;
        let total = 0;
        let desconto = 0;

        for(let i in cart) {
            let pizzaItem = pizzaJson.find((item)=>item.id == cart[i].id);
            subtotal += pizzaItem.price * cart[i].qt;

            let cartItem = c(".models .cart--item").cloneNode(true);

            let pizzaSizeName;
            switch (cart[i].size){
                case 0:
                    pizzaSizeName = 'P';
                    break;
                case 1:
                    pizzaSizeName = 'M';
                    break;
                case 2:
                    pizzaSizeName = 'G';
                    break;
            }
            let pizzaName = `${pizzaItem.name} (${pizzaSizeName})`;

             cartItem.querySelector('img').src=pizzaItem.img;
             cartItem.querySelector('.cart--item-nome').innerHTML=pizzaName;
             cartItem.querySelector('.cart--item--qt').innerHTML=cart[i].qt;
             cartItem.querySelector('.cart--item-qtmenos').addEventListener('click',()=>{
                if(cart[i].qt>1){
                    cart[i].qt--;
                } else {
                    cart.splice(i,1);
                }
                 atualizarCarrinho();
             });
            cartItem.querySelector('.cart--item-qtmais').addEventListener('click',()=>{
                cart[i].qt++;
                atualizarCarrinho();
            });
            c('.cart').append(cartItem);
        }
        desconto = subtotal *0.1;
        total = subtotal-desconto;

        c('.subtotal span:last-child').innerHTML =`R$ ${subtotal.toFixed(2)}`;
        c('.desconto span:last-child').innerHTML =`R$ ${desconto.toFixed(2)}`;
        c('.total span:last-child').innerHTML= `R$ ${total.toFixed(2)}`;
    }else{
        c('aside').classList.remove('show');
        c('aside').style.left='100vw';

    }
}
