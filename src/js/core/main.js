import { Ball } from "../models/ball.js";
import { Brick } from "../models/brick.js";
import { Paddle } from "../models/paddle.js";
import { Game } from "./game.js";

export function main() {
    const game = new Game(2);
    game.setup(2);
    game.paddle.listener();

    requestAnimationFrame(() => updateGameState(game));
}
export function updateGameState(game) {
    game.collisionWithBricks();
    game.collisionswithcontainer();
    game.collisionWithPaddle();
    requestAnimationFrame(() => updateGameState(game));
}


main();