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

        // Cache dimensions
        const containerRect = container.getBoundingClientRect();
        const paddleWidth = isPortrait ? '10vw' : '10vh';
        const paddleHeight = isPortrait ? '2vw' : '2vh';
        const ballSize = isPortrait ? '2vw' : '2vh';

        // Apply styles in batches
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


    console.time('debut');
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
            game.paddle.listener('keydown', game.paddle.keyDownHandler);
            game.addchrono();
            game.isPaused = false;
        }
    });
    adjustStyles();
    requestAnimationFrame(() => updateGameState(game));
    console.timeEnd('debut');
}


export function updateGameState(game) {
    // console.time('frame');

    if (game.isPaused) {
        handlePausedState(game);
    } else if (game.player.lives > 0 && !game.isWin()) {
        handleActiveState(game);
    }

    if (game.isWin()) {
        handleWinState(game);
    } else if (game.player.lives === 0) {
        handleGameOver(game);
    }

    // console.timeEnd('frame');
    requestAnimationFrame(() => updateGameState(game));
}

function handlePausedState(game) {
    game.stopchrono();
    game.ball.reset();

    if (game.overlay.style.display === 'block') {
        game.paddle.removeListener('keydown', game.paddle.keyDownHandler);
    }
}

function handleActiveState(game) {
    game.checkCollisions();
    game.updateHeader();
}

function handleWinState(game) {
    game.stopchrono();
    game.isPaused = true;

    if (game.currentLevel === levels.length - 1) {
        displayWinMessage(game);
    } else {
        moveToNextLevel(game);
    }
}

function displayWinMessage(game) {
    game.overlay.style.display = 'block';
    const winMessage = document.createElement("h1");
    winMessage.textContent = 'You Win';
    winMessage.classList.add('win-message');
    document.body.append(winMessage);
}

function moveToNextLevel(game) {
    game.currentLevel++;
    game.bricksContainer.innerHTML = ''; // Clear previous level
    game.setupbricks();
    game.ball.reset();
    game.updateHeader();
}

function handleGameOver(game) {
    game.gameover();
    game.stopchrono();
}

main();
