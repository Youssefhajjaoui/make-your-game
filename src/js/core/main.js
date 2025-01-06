import { Player } from "../models/player.js";
import { Game } from "./game.js";
import { levels } from "./utils.js";


export function main() {
    function adjustStyles() {
        const isPortrait = window.innerWidth <= window.innerHeight;
        const container = document.querySelector('.container');
        const brick = document.querySelectorAll('.brick');
        const paddle = document.querySelector('.paddle');
        const ball = document.querySelector('.ball');
        const menuBar = document.querySelector('.menu-bar');
    
        if (isPortrait) {
            container.style.width = '100vw';
            container.style.height = '100vw';
        } else {
            container.style.width = '100vh';
            container.style.height = '100vh';
        }
    
        brick.forEach(b => {
            b.style.width = isPortrait ? '12vw' : '4.5vw';
            b.style.height = isPortrait ? '8vh' : '3vh';
        });
    
        paddle.style.width = isPortrait ? '20vw' : '7vw';
        paddle.style.height = isPortrait ? '6vh' : '2vh';
    
        ball.style.width = isPortrait ? '4vw' : '1.5vw';
        ball.style.height = isPortrait ? '4vw' : '1.5vw';
    
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
    document.addEventListener('keydown',(event) => {
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
}


export function updateGameState(game) {
    if (game.isPaused) {
        game.stopchrono();
        game.ball.reset();
        if (game.overlay.style.display === 'block') {
            game.paddle.removeListener('keydown', game.paddle.keyDownHandler);
        }
    } else if (!game.isPaused && game.player.lives > 0 && !game.isWin()) {
        game.collisionWithBricks();
        game.collisionswithcontainer();
        game.collisionWithPaddle();
        game.updateHeader();
    }
    
    if (game.isWin()) {
        game.stopchrono();
        game.isPaused = true;

        if(game.currentLevel === levels.length - 1){
            game.overlay.style.display = 'block';
            const winMessage = document.createElement("h1");
            winMessage.textContent = 'You Win';
            winMessage.classList.add('win-message');
            document.body.append(winMessage);
            game.isPaused = true;
        }else{
            game.currentLevel++;
            game.setupbricks();
            game.ball.reset();
            game.updateHeader();
            game.bricksContainer.innerHTML = '';
        }
    }else if (game.player.lives === 0) {
        game.gameover();
        game.stopchrono();
    }

    requestAnimationFrame(() => updateGameState(game));
}

main();
