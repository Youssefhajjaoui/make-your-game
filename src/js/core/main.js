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
const startColor = [0, 50, 150]; 
const endColor = [90, 204, 229]; 
const rgbIncrement = 0.5;
let fact = 1; 
let color = [...startColor]; 

function updateBackgroundColor() {
    for (let i = 0; i < 3; i++) {
        color[i] += rgbIncrement * fact;

        if (color[i] >= endColor[i] || color[i] <= startColor[i]) {
            fact *= -1;
        }
    }

    document.body.style.setProperty(
        "--dynamic-gradient",
        `linear-gradient(to right, rgb(${color[0]}, ${color[1]}, ${color[2]}), rgb(${color[0] + rgbIncrement}, ${color[1] + rgbIncrement}, ${color[2] + rgbIncrement}))`
    );

    document.body.style.background = `var(--dynamic-gradient)`;

}


export function updateGameState(game, timestamp) {

    updateBackgroundColor()



    if (game.isPaused) {
        game.stopChrono();
        if (game.overlay.style.display === 'block') {
            game.paddle.removeListener('keydown', game.paddle.keyDownHandler);
        }else{
            game.ball.reset(game.paddle.dimensions);
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
