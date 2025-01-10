import { Player } from "../models/player.js";
import { Game } from "./game.js";


export function main() {
    const player = new Player();
    const game = new Game();
    player.game = game;
    game.player = player;
    game.isPaused = true;
    game.listenertoreseize();
    game.setup();
    player.listnermenu();

    // Add FPS monitoring
    game.frameCount = 0;
    game.lastFpsUpdate = performance.now();
    game.fps = 0;
    game.longFrames = 0;
    game.droppedFrames = 0;
    document.addEventListener('keydown', (event) => {

        event.preventDefault();
        if (event.code === "Space") {
            if (game.player.overlay.style.display === 'block') {
                return;
            }
            game.paddle.listener('keydown', game.paddle.keyDownHandler.bind(game.paddle, game.containerdimension));
            game.isPaused = false;
        }
    });

    requestAnimationFrame((timestamp) => updateGameState(game, timestamp));
}
let rgb = [[100, 190, 240], [10, 20, 40]]; 
const rgbIncrement = 1;  
let fact = 1;  
let color = [99, 100, 100];

function updateBackgroundColor() {
    color[0] += rgbIncrement * fact;
    color[1] += rgbIncrement * fact;
    color[2] += rgbIncrement * fact;
    if ((color[0] <= rgb[1][0]||color[0] >= rgb[0][0])  || (color[1] <= rgb[1][1]||color[1] >= rgb[0][1]) || (color[2] <= rgb[1][2]|| color[2] >= rgb[0][2])) {
        fact *= -1;
    } 
    document.body.style.background = `linear-gradient(to right, rgb(${color[0]}, ${color[1]}, ${color[2]}), rgb(${color[0]-20}, ${color[1]+10}, ${color[2]+10}))`;
}



export function updateGameState(game, timestamp) {

    updateBackgroundColor()



    if (game.isPaused) {
        game.stopChrono();
        if (game.overlay.style.display === 'block') {
            game.paddle.removeListener('keydown', game.paddle.keyDownHandler);
        }else{
           // game.ball.reset(game.paddle.dimensions);
        }
    } else if (!game.isPaused && game.player.lives > 0 && !game.isWin()) {
        game.collisionWithBricks();
        game.collisionswithcontainer();
        game.collisionWithPaddle();
        game.updateHeader();
        game.updateChrono(Date.now());
    }

    if (game.isWin()) {
        game.isPaused = true;
        game.stopChrono();
        game.paddle.removeListener('keydown', game.paddle.keyDownHandler);
        if (game.currentLevel === levels.length - 1) {
            game.overlay.style.display = 'block';
            const winMessage = document.createElement("h1");
            winMessage.textContent = 'You Win';
            winMessage.classList.add('win-message');
            document.body.append(winMessage);
            game.isPaused = true;
        } else {
            game.currentLevel++;
            game.setupbricks();
            game.ball.reset(game.paddle.dimensions);
            game.updateHeader();
            game.bricksContainer.replaceChildren();
        }
    } else if (game.player.lives === 0) {
        game.paddle.removeListener('keydown', game.paddle.keyDownHandler);
        game.gameover();
        game.stopChrono();
    }

    // game.lastFrameTime = timestamp;
    requestAnimationFrame((timestamp) => updateGameState(game, timestamp));
}

main();

function adjustStyles() {
    const isPortrait = window.innerWidth <= window.innerHeight;
    const container = document.querySelector('.container');
    const paddle = document.querySelector('.paddle');
    const ball = document.querySelector('.ball');
    const menuBar = document.querySelector('.menu-bar');

    const containerRect = container.getBoundingClientRect();
    const paddleWidth = isPortrait ? '10vw' : '10vh';
    const paddleHeight = isPortrait ? '2vw' : '2vh';
    const ballSize = isPortrait ? '2vw' : '2vh';

    container.style.cssText = `
                        width: ${isPortrait ? '100vw' : '100vh'};
                        height: ${isPortrait ? '100vw' : '100vh'};
                    `;
    paddle.style.cssText = `
                        width: ${paddleWidth};
                        height: ${paddleHeight};
                        top: ${containerRect.bottom - parseFloat(paddleHeight) * window.innerWidth * 0.02}px;
                        left: ${containerRect.right - containerRect.width / 2 - parseFloat(paddleWidth) / 2}px;
                    `;

    ball.style.cssText = `
                        width: ${ballSize};
                        height: ${ballSize};
                    `;

    menuBar.style.padding = isPortrait ? '5vh 0' : '3vh 0';
    document.querySelector('.menu-bar h1').style.fontSize = isPortrait ? '5vh' : '3vh';
    document.querySelectorAll('.menu-bar div, .menu-bar button, .menu-bar a').forEach(el => {
        el.style.fontSize = isPortrait ? '3vh' : '2vh';
    });
}
