const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');

window.addEventListener('load', startGame);

function startGame() {
    // como hacer para que nuestro canvas siempre sea un cuadrado:
    let cnavasSize;
    
    if (window.innerHeight > window.innerWidth) {
        cnavasSize = window.innerWidth * 0.8;
    } else {
        cnavasSize = window.innerHeight * 0.8;
    }

    canvas.setAttribute('width', cnavasSize)
    canvas.setAttribute('height', cnavasSize)





    //como hacemos para saber la medida de nuestro canvas? esto nos sirve para saber que medida tendran nuestros elementos y puedan entrar sin problemas 10 de ellos.
    const elementSize = (cnavasSize / 10) - 1;

    console.log({cnavasSize, elementSize});
    
    //Insertar objetos con la propiedad fillText y ajustar tamaño en realación al tamaño del canvas:
    game.font = elementSize + 'px Verdana';

    game.textAlign = '';

    //utilizamos un ciclo for para ir agregando elementos en base al tamaño de nuestro canvas:
    //inicializamos la variable i en 1; le indicamos que mientras i sea menor a 10 vamos a aumentar i una vez:
    for (let i = 0; i < 10; i++) {
        game.fillText(emojis['X'], elementSize * i, elementSize);
    }
        
    
    
    



    
}