function Creat_briks() {
    const brik = document.createElement('dev')
    brik.className = 'brike'
    return brik
}

function Setup_board() {
    const containerbricks = document.createElement('div');
    containerbricks.className = "container";
    for (let i = 0; i < 27; i++) {
        const brik = Creat_briks();
        containerbricks.appendChild(brik);
    }
    const padel = document.createElement('div');
    padel.className = "padel";
    containerbricks.append(padel)
    const ball = document.createElement('div');
    ball.className = "ball";
    containerbricks.append(ball)
    document.body.append(containerbricks)
}

Setup_board()

let ball = document.querySelector('.ball');
let container = document.querySelector('.container');
let paddle = document.querySelector('.padel');

let ballX = 290;
let ballY = 350;
let dx = 2;
let dy = -2;


const ballRadius = 7.5;
const containerWidth = container.offsetWidth;
const containerHeight = container.offsetHeight;


const paddleWidth = paddle.offsetWidth;
const paddleHeight = paddle.offsetHeight;


function moveBall() {

    ballX += dx;
    ballY += dy;
    if (ballX <= 0 || ballX + ballRadius * 2 >= containerWidth) {
        dx = -dx;
    }
    if (ballY <= 0) {
        dy = -dy;
    }


    if (
        ballY + ballRadius * 2 >= containerHeight - paddleHeight &&
        ballX + ballRadius > paddle.offsetLeft &&
        ballX < paddle.offsetLeft + paddleWidth
    ) {
        dy = -dy;
    }


    if (ballY + ballRadius * 2 >= containerHeight) {
        alert('Game Over!');
        clearInterval(gameLoop);
    }

    ball.style.left = `${ballX}px`;
    ball.style.top = `${ballY}px`;
}

let gameLoop = setInterval(moveBall, 100);
