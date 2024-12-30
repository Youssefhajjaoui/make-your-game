import { Player } from "../models/player.js";
import { Game } from "./game.js";

let currentLevel = 1;

export function main() {
    const player = new Player();
    const game = new Game();
    player.game = game;
    game.player = player;
    game.isPaused = true;

    game.setup(currentLevel);
    player.listnermenu();
    game.paddle.listener();

    requestAnimationFrame(() => updateGameState(game));
}

export function updateGameState(game) {
    if (!game.isPaused && game.player.lives > 0 && !game.iswin()) {
        game.collisionWithBricks();
        game.collisionswithcontainer();
        game.collisionWithPaddle();
        game.updateHeader();
    } else if (game.player.lives === 0) {
        game.gameover();
        return;
    } else if (game.iswin()) {
        let container = document.querySelector('.container');
        if (container) {
            container.textContent = '';
        }
        currentLevel++;
        game.setup(currentLevel);
        game.player.listnermenu();
        game.paddle.listener();
        game.isPaused = true;
    }

    if (game.isPaused && !document.querySelector('.menu-bar')) {
        document.addEventListener('keydown', function startGame(event) {
            if (event.code === "Space") {
                game.isPaused = false;
                document.removeEventListener('keydown', startGame);
                requestAnimationFrame(() => updateGameState(game));
            }
        });
    } else {
        requestAnimationFrame(() => updateGameState(game));
    }
}

main();
