import { Player } from "../models/player.js";
import { Game } from "./game.js";
import { levels } from "./utils.js";


export function main() {
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


    const player = new Player();
    const game = new Game();
    player.game = game;
    game.player = player;
    game.isPaused = true;
    game.listenertoreseize();
    game.setup();
    player.listnermenu();
    document.addEventListener('keydown', (event) => {
        if (event.code === "Space") {
            if (game.player.overlay.style.display === 'block') {
                return
            }
            game.paddle.listener('keydown', game.paddle.keyDownHandler.bind(game.paddle, game.containerdimension));

            game.isPaused = false;
        }
    });

    requestAnimationFrame(() => updateGameState(game));
}


export function updateGameState(game) {
    if (game.isPaused) {
        game.stopChrono();
        game.ball.reset(game.paddle.dimensions);
        if (game.overlay.style.display === 'block') {
            game.paddle.removeListener('keydown', game.paddle.keyDownHandler);
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
            game.bricksContainer.innerHTML = '';
        }
    } else if (game.player.lives === 0) {
        game.gameover();
        game.stopChrono();
    }

    requestAnimationFrame(() => updateGameState(game));
}

main();
