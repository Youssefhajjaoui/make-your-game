import { Player } from "../models/player.js";
import { Game } from "./game.js";


export function main() {
    if(window.innerWidth <= window.innerHeight){
        document.querySelector('.container').style.width = '100vw';
        document.querySelector('.container').style.height = '100vw';
    }else{
        document.querySelector('.container').style.width = '100vh';
        document.querySelector('.container').style.height = '100vh';
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
        game.bricksContainer.innerHTML = '';
        game.currentLevel++;
        game.setupbricks();
        game.ball.reset();
        game.updateHeader();
        game.stopchrono();
        game.isPaused = true;
    }else if (game.player.lives === 0) {
        game.gameover();
        game.stopchrono();
    }

    requestAnimationFrame(() => updateGameState(game));
}

main();
