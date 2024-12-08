import { Ball } from "../models/ball.js";
import { Brick } from "../models/brick.js";
import { Paddle } from "../models/paddle.js";
import { Game } from "./game.js";

export function main() {
    const game = new Game(1);
    game.start();

    function gameLoop(timestamp) {
        requestAnimationFrame(gameLoop);
    }
    requestAnimationFrame(gameLoop);
}

main();