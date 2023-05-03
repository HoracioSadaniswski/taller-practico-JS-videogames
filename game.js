const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');
const btnUp = document.querySelector('#up');
const btnLeft = document.querySelector('#left');
const btnRight = document.querySelector('#right');
const btnDown = document.querySelector('#down');
const spanlives = document.querySelector('#lives');

let canvasSize;
let elementSize;
let level = 0;
let lives = 3;

const playerPosition = {
    x: undefined,
    y: undefined,
};

const giftPosition = {
    x: undefined,
    y: undefined,
};

let enemyPositions = [];

window.addEventListener('load', setCanvasSize);
window.addEventListener('resize', setCanvasSize); 

function setCanvasSize() {
    if (window.innerHeight > window.innerWidth) {
        canvasSize = window.innerWidth * 0.8;
    } else {
        canvasSize = window.innerHeight * 0.8;
    }

    canvas.setAttribute('width', canvasSize)
    canvas.setAttribute('height', canvasSize)

    elementSize = (canvasSize / 10) - 1;

    startGame ();
}

function startGame () {
    console.log({canvasSize, elementSize});
    
    game.font = elementSize + 'px Verdana';
    game.textAlign = '';

    const map = maps[level];

    if (!map) {
        gameWin();
        return;
    }

    const mapRows = map.trim().split('\n');
    const mapRowsCols = mapRows.map(row => row.trim().split(''));
    console.log([map, mapRows, mapRowsCols]);

    showlives();

    enemyPositions = [];
    game.clearRect(0, 0, canvasSize, canvasSize);

    mapRowsCols.forEach((row, rowI) => {
        row.forEach((col, colI) => {
            const emoji = emojis[col];
            const posX = elementSize * (colI);
            const posY = elementSize * (rowI + 1);

            if (col == 'O') {
                if (!playerPosition.x && !playerPosition.y) {
                    playerPosition.x = posX;
                    playerPosition.y = posY;
                    console.log(playerPosition);
                }
            } else if (col == 'I') {
                giftPosition.x = posX;
                giftPosition.y= posY;
            } else if (col == 'X') {
                enemyPositions.push({
                    x: posX,
                    y: posY,
                });
            }

            game.fillText(emoji, posX, posY);
        });
    });

    movePlayer();
    /* for (let row = 1; row <= 10; row++) {
        for (let col = 0; col < 10; col++) {
            game.fillText(emojis[mapRowsCols[row-1][col]], elementSize * col, elementSize * row);
        }
    } */
    
}

function movePlayer () {
    const giftColisionX = playerPosition.x.toFixed(1) == giftPosition.x.toFixed(1);
    const giftColisionY = playerPosition.y.toFixed(1) == giftPosition.y.toFixed(1);
    const giftColision = giftColisionX && giftColisionY;

    if (giftColision) {
        levelwin();

        console.log('Subiste de nivel');
    }

    const enemyColision = enemyPositions.find(enemy => {
        const enemyClisionX = enemy.x.toFixed(1) == playerPosition.x.toFixed(1);
        const enemyClisionY = enemy.y.toFixed(1) == playerPosition.y.toFixed(1);
        return enemyClisionX && enemyClisionY;
    });

    if (enemyColision) {
        levelFail();
    }

    game.fillText(emojis['PLAYER'], playerPosition.x, playerPosition.y);

}

function levelwin () {
    console.log('Subiste de nivel');
    level++;
    startGame();
}

function levelFail() {
    console.log('Chocaste con un enemigo!')
    lives --;

    if (lives <= 0) {
        level = 0;
        lives = 3;
    }

    playerPosition.x = undefined;
    playerPosition.y = undefined;
    startGame();
}

function gameWin () {
    alert ('Terminaste!');
}

function showlives () {
    const heartsArray = Array(lives).fill(emojis['HEART'])

    spanlives.innerHTML= '';
    heartsArray.forEach(heart => spanlives.append(heart));
}

window.addEventListener('keydown', moveByKeys);
btnUp.addEventListener('click', moveUp);
btnLeft.addEventListener('click', moveLeft);
btnRight.addEventListener('click', moveRight);
btnDown.addEventListener('click', moveDown);

function moveByKeys(event) {
    switch (event.key) {
        case 'ArrowUp':
            moveUp();
            break;
        case 'ArrowLeft':
            moveLeft();
            break;
        case 'ArrowRight':
            moveRight();
            break;
        case 'ArrowDown':
            moveDown();
            break;
    }
}

function moveUp() {
    console.log('Movimiento hacia Arriba');
    if ((playerPosition.y - elementSize) < 0) {
        console.log('Saliste del mapa');
    } else {
        playerPosition.y -= elementSize;
        startGame();
    }
}
function moveLeft() {
    console.log('Movimiento hacia izquierda');
    if ((playerPosition.x - elementSize) < 0) {
        console.log('Saliste del mapa');
    } else {
        playerPosition.x -= elementSize;
        startGame();
    }
}
function moveRight() {
    console.log('Movimiento hacia derecha');
    if ((playerPosition.x + elementSize) > (canvasSize-elementSize)) {
        console.log('Saliste del mapa');
    } else {
        playerPosition.x += (elementSize);
        startGame();
    }
}
function moveDown() {
    console.log('Movimiento hacia abajo');
    if ((playerPosition.y + elementSize) > canvasSize) {
        console.log('Saliste del mapa');
    } else {
        playerPosition.y += elementSize;
        startGame();
    }
}