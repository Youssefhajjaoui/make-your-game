import { Ball } from "../models/ball.js";
import { Brick } from "../models/brick.js";
import { Paddle } from "../models/paddle.js";
import { Game } from "./game.js";

export function main() {
    const game = new Game(1);
    game.setup(1);
    //console.log(game.ball, game.paddle, game.bricksLive);
    game.paddle.listener();

    requestAnimationFrame(() => updateGameState(game));
}
export function updateGameState(game) {
    // console.log(game.paddle.elem);

    collisionswithcontainer(game);
    collisionWithPaddle(game);
    // Continue game loop
    requestAnimationFrame(() => updateGameState(game));
}

function collisionswithcontainer(game) {
    const container = document.querySelector(".container");
    const containerRect = container.getBoundingClientRect();
    const ball = game.ball;

    // Calculate actual boundaries including the border
    const rightBound = containerRect.width - ball.radius * 2;  // Account for full ball width
    const bottomBound = containerRect.height - ball.radius * 2; // Account for full ball height

    let newDx = ball.vectx;
    let newDy = ball.vecty;

    // Right boundary
    if (ball.x >= rightBound) {
        ball.x = rightBound; // Reset position
        newDx = -Math.abs(newDx);
    }
    // Left boundary
    if (ball.x <= 0) {
        ball.x = 0;
        newDx = Math.abs(newDx);
    }
    // Top boundary
    if (ball.y <= 0) {
        ball.y = 0;
        newDy = Math.abs(newDy);
    }
    // Bottom boundary
    if (ball.y >= bottomBound) {
        ball.y = bottomBound;
        newDy = -Math.abs(newDy);
    }

    game.bricksLive.forEach(element => {
        const brick = element.getBoundingClientRect();
    });

    ball.move(newDx, newDy);
    ball.vectx = newDx;
    ball.vecty = newDy;
}

function collisionWithPaddle(game) {
    const ball = game.ball;
    const paddle = game.paddle.elem.getBoundingClientRect();

    const ballCenterX = ball.x;
    const ballCenterY = ball.y;

    // Check if ball is within paddle's x bounds and at the right y position
    if (ballCenterX >= paddle.left &&
        ballCenterX >= paddle.right &&
        ballCenterY >= paddle.top && ballCenterY <= paddle.bottom) {

        // On collision, reverse vertical direction
        ball.vecty = -Math.abs(ball.vecty);

        // Change horizontal direction based on where the ball hits
        const hitLocation = (ballCenterX - paddle.left) / paddle.width;
        if (hitLocation < 0.3) {
            ball.vectx = -5; // Left side hit
        } else if (hitLocation > 0.7) {
            ball.vectx = 5;  // Right side hit
        } else {
            // Hit in middle, keep current horizontal direction
            ball.vectx = ball.vectx * 0.8; // Slightly reduce horizontal speed
        }
    }

    ball.move(ball.vectx, ball.vecty);
}
main();