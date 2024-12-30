import { Player } from "../models/player.js";
import { Game } from "./game.js";

export function main() {
    const player = new Player();
    const game = new Game(2);
    player.game = game;
    game.player = player;
    game.isPaused = true;
    game.setup(2);
    player.listnermenu();
    game.paddle.listener();

    const startGame = () => {
        requestAnimationFrame(() => updateGameState(game));
        document.removeEventListener('keydown', startGame);
        game.isPaused = false;
    };
    if (game.isPaused) {
        document.addEventListener('keydown', startGame);
    }
}

export function updateGameState(game) {
    if (!game.isPaused && game.player.lives > 0) {
        game.collisionWithBricks();
        game.collisionswithcontainer();
        game.collisionWithPaddle();
        game.updateHeader();
    } else if (game.player.lives === 0) {
        game.gameover();
        return;
    }
    requestAnimationFrame(() => updateGameState(game));
}

main();
