const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');

let canvasSize;
let elementSize;

window.addEventListener('load', setCanvasSize);
window.addEventListener('resize', setCanvasSize); //(al llamar a nuestro evento resize e indicarle que inicie la funcion serCanvasSize logramos que el canvas sea responsivo y se adapte automaticamente al tamño de la pantalla sin la necesidad de recargar la pag.)

function setCanvasSize() {
    if (window.innerHeight > window.innerWidth) {
        canvasSize = window.innerWidth * 0.8;
    } else {
        canvasSize = window.innerHeight * 0.8;
    }

    canvas.setAttribute('width', canvasSize)
    canvas.setAttribute('height', canvasSize)

    //como hacemos para saber la medida de nuestro canvas? esto nos sirve para saber que medida tendran nuestros elementos y puedan entrar sin problemas 10 de ellos.
    elementSize = (canvasSize / 10) - 1;

    
    startGame ();
}

function startGame () {
    console.log({canvasSize, elementSize});
    
    //Insertar objetos con la propiedad fillText y ajustar tamaño en realación al tamaño del canvas:
    game.font = elementSize + 'px Verdana';
    game.textAlign = '';

    const map = maps[0];
    const mapRows = map.trim().split('\n');
    const mapRowsCols = mapRows.map(row => row.trim().split(''));
    console.log([map, mapRows, mapRowsCols]);

    //utilizamos un ciclo for para ir agregando elementos en base al tamaño de nuestro canvas:
    //inicializamos la variable i en 1; le indicamos que mientras i sea menor a 10 vamos a aumentar i una vez:
    for (let row = 1; row <= 10; row++) {
        for (let col = 0; col < 10; col++) {
            game.fillText(emojis[mapRowsCols[row-1][col]], elementSize * col, elementSize * row);
        }
    }
}