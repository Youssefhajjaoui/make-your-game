import { Player } from "../models/player.js";
import { Game } from "./game.js";


export function main() {
    const player = new Player();
    const game = new Game();
    player.game = game;
    game.player = player;
    game.isPaused = true;

    game.setup();
    player.listnermenu();
    game.paddle.listener();

    requestAnimationFrame(() => updateGameState(game));
}

export function updateGameState(game) {
    if (game.isPaused) {
        const startGame = (event) => {
            if (event.code === "Space") {
                game.isPaused = false;
                document.removeEventListener('keydown', startGame);
            }
        }
        document.addEventListener('keydown', startGame);
    }
    if (!game.isPaused && game.player.lives > 0 && !game.iswin()) {
        game.collisionWithBricks();
        game.collisionswithcontainer();
        game.collisionWithPaddle();
        game.updateHeader();
    } else if (game.player.lives === 0) {
        game.gameover();
        return;
    } else if (game.iswin()) {
        game.bricksContainer.innerHTML = '';
        game.currentLevel++;
        game.setupbricks();
        game.ball.reset();
        game.isPaused = true;
    }


    // } else {
    requestAnimationFrame(() => updateGameState(game));
    // }
}

main();
