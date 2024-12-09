import { Ball } from "../models/ball.js";
import { Brick } from "../models/brick.js";
import { Paddle } from "../models/paddle.js";
import { Game } from "./game.js";

export function main() {
    const game = new Game(1);
    game.start();
    requestAnimationFrame(() => updateGameState(game));
}
export function updateGameState(game) {
    const container = document.querySelector(".container");
    const containerRect = container.getBoundingClientRect();
    const ball = game.ball;

    let ballX = ball.x;
    let ballY = ball.y;
    let ballRadius = ball.radius;

    let newDx = ball.vectx;
    let newDy = ball.vecty;

    if (ballX + ballRadius >= containerRect.right) {
        newDx = -Math.abs(newDx);
    }
    if (ballX - ballRadius <= containerRect.left) {
        newDx = Math.abs(newDx);
    }
    if (ballY - ballRadius <= containerRect.top) {
        newDy = Math.abs(newDy);
    }
    if (ballY + ballRadius >= containerRect.bottom) {
        newDy = -Math.abs(newDy);
    }

    ball.move(newDx, newDy);

    // Update ball's velocity
    ball.vectx = newDx;
    ball.vecty = newDy;

    // Continue game loop
    requestAnimationFrame(() => updateGameState(game));
}
main();