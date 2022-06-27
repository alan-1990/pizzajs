let pizzaJson = [
    {id:1, name:'Mussarela', img:'images/pizza.png', price:20.19, sizes:['100g', '530g', '860g'], description:'Pizza de queijo, molho de tomate e azeitonas'},
    {id:2, name:'Marguerita', img:'images/pizza2.png', price:18.00, sizes:['320g', '530g', '860g'], description:'Queijo, tomate em rodelas, manjericão molho de tomate e azeitonas'},
    {id:3, name:'Quatro Queijos', img:'images/pizza3.png', price:17.45, sizes:['320g', '530g', '860g'], description:'Mussarela,catupiy,golda, gorgonzola e azeitonas'},
    {id:4, name:'Americana', img:'images/pizza4.png', price:19.77, sizes:['320g', '530g', '860g'], description:'Pimentão, mussarela, azeitonas e salame'},
    {id:5, name:'Sorvete', img:'images/pizza5.png', price:21.43, sizes:['320g', '530g', '860g'], description:'Sorvete e mms'},
    {id:6, name:'Moda da Casa', img:'images/pizza6.png', price:18.55, sizes:['320g', '530g', '860g'], description:'Calabresa,frango desfiado, queijo mussarela, salame,tomate fatiado e azeitonas'},
    {id:7, name:'Chocolate', img:'images/pizza7.png', price:22.36, sizes:['320g', '530g', '860g'], description:'Chocolate garoto,palitinhos crocantes e barrinhas de Buenno'}
];

//No futuro, seria necessário criar um modal que só o dono do site tem acesso, para cadastrar produtos
// ou remover produtos, este arquivo seria um ajax que puxa um json do sistema para pegar todos os dados dos produtos existentes