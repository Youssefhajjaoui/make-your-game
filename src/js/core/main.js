import { Ball } from "../models/ball.js";
import { Brick } from "../models/brick.js";
import { Paddle } from "../models/paddle.js";
import { Player } from "../models/player.js";
import { Game } from "./game.js";

export function main() {
    const player = new Player;
    const game = new Game(2);
    player.game = game;
    game.player = player;
    game.setup(2);
    player.listnermenu();
    game.paddle.listener();

    requestAnimationFrame(() => updateGameState(game));
}
export function updateGameState(game) {
    if (!game.isPaused) {
        game.collisionWithBricks();
        game.collisionswithcontainer();
        game.collisionWithPaddle();
    }
    requestAnimationFrame(() => updateGameState(game));
}


main();