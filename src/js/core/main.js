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
    requestAnimationFrame(() => updateGameState(game));
}

export function updateGameState(game) {
    if (game.isPaused) {
        if (game.overlay.style.display === 'block') {
            game.paddle.removeListener('keydown', game.paddle.keyDownHandler);
        } else {
            game.paddle.listener('keydown', game.paddle.keyDownHandler);
            game.ball.reset();
        }
        const startGame = (event) => {
            if (event.code === "Space") {
                game.isPaused = false;
                document.removeEventListener('keydown', startGame);
            }
        }
        document.addEventListener('keydown', startGame);
    }else if (game.isLose) {
        document.removeEventListener('keydown', startGame);
        return
    }
    if (!game.isPaused && game.player.lives > 0 && !game.iswin()) {
        game.collisionWithBricks();
        game.collisionswithcontainer();
        game.collisionWithPaddle();
        game.updateHeader();
    } else if (game.player.lives === 0) {
        game.gameover();
    } else if (game.iswin()) {
        game.bricksContainer.innerHTML = '';
        game.currentLevel++;
        game.setupbricks();
        game.ball.reset();
        game.updateHeader();
        game.isPaused = true;
    }
    requestAnimationFrame(() => updateGameState(game));
}

main();
