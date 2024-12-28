import { Ball } from "../models/ball.js";
import { Brick } from "../models/brick.js";
import { Paddle } from "../models/paddle.js";
import { Game } from "./game.js";

export function main() {
    const game = new Game(2);
    game.setup(2);
    //console.log(game.ball, game.paddle, game.bricksLive);
    game.paddle.listener();

    requestAnimationFrame(() => updateGameState(game));
}
export function updateGameState(game) {
    // console.log(game.paddle.elem);
    collisionWithBricks(game);
    collisionswithcontainer(game);
    collisionWithPaddle(game);
    // Continue game loop
    requestAnimationFrame(() => updateGameState(game));
}

function collisionswithcontainer(game) {
    const container = document.querySelector(".container");
    const containerRect = container.getBoundingClientRect();
    const ball = game.ball;

    const rightBound = containerRect.width - ball.radius * 2;
    const bottomBound = containerRect.height - ball.radius * 2;

    let newDx = ball.vectx;
    let newDy = ball.vecty;

    if (ball.x >= rightBound) {
        ball.x = rightBound;
        newDx = -Math.abs(newDx);
    }

    if (ball.x <= 0) {
        ball.x = 0;
        newDx = Math.abs(newDx);
    }

    if (ball.y <= 0) {
        ball.y = 0;
        newDy = Math.abs(newDy);
    }

    if (ball.y >= bottomBound) {
        ball.y = bottomBound;
        newDy = -Math.abs(newDy);
    }

    ball.move(newDx, newDy);
    ball.vectx = newDx;
    ball.vecty = newDy;
}

function collisionWithPaddle(game) {
    const ball = game.ball;
    const paddle = game.paddle.elem.getBoundingClientRect();


    const ballElem = ball.elem.getBoundingClientRect();
    const ballRadius = ballElem.width / 2;
    const ballCenterX = ballElem.left + ballRadius;
    const ballCenterY = ballElem.top + ballRadius;

    const ballLeft = ballCenterX - ballRadius;
    const ballRight = ballCenterX + ballRadius;
    const ballTop = ballCenterY - ballRadius;
    const ballBottom = ballCenterY + ballRadius;


    if (ballRight >= paddle.left &&
        ballLeft <= paddle.right &&
        ballBottom >= paddle.top &&
        ballTop <= paddle.bottom) {


        ball.vecty = -Math.abs(ball.vecty);


        const paddleWidth = paddle.right - paddle.left;
        const hitLocation = (ballCenterX - paddle.left) / paddleWidth;

        if (hitLocation < 0.3) {
            ball.vectx = -2;
        } else if (hitLocation > 0.7) {
            ball.vectx = 2;
        } else {
            ball.vectx *= 0.8;
        }
    }


    ball.move(ball.vectx, ball.vecty);
}

function collisionWithBricks(game) {
    const ball = game.ball;
    const ballElem = ball.elem.getBoundingClientRect();
    const ballRadius = ballElem.width / 2;
    const ballCenterX = ballElem.left + ballRadius;
    const ballCenterY = ballElem.top + ballRadius;

    // Iterate over all live bricks
    game.bricksLive.forEach((brick, index) => {
        const brickRect = brick.elem.getBoundingClientRect();

        // Check for collision
        if (
            ballCenterX + ballRadius >= brickRect.left &&
            ballCenterX - ballRadius <= brickRect.right &&
            ballCenterY + ballRadius >= brickRect.top &&
            ballCenterY - ballRadius <= brickRect.bottom
        ) {
            // Determine the collision side
            const overlapLeft = Math.abs(ballCenterX + ballRadius - brickRect.left);
            const overlapRight = Math.abs(ballCenterX - ballRadius - brickRect.right);
            const overlapTop = Math.abs(ballCenterY + ballRadius - brickRect.top);
            const overlapBottom = Math.abs(ballCenterY - ballRadius - brickRect.bottom);

            // Find the smallest overlap to determine the collision side
            const minOverlap = Math.min(overlapLeft, overlapRight, overlapTop, overlapBottom);

            if (minOverlap === overlapTop) {
                ball.vecty = -Math.abs(ball.vecty); // Ball hit the top of the brick
            } else if (minOverlap === overlapBottom) {
                ball.vecty = Math.abs(ball.vecty); // Ball hit the bottom of the brick
            } else if (minOverlap === overlapLeft) {
                ball.vectx = -Math.abs(ball.vectx); // Ball hit the left side of the brick
            } else if (minOverlap === overlapRight) {
                ball.vectx = Math.abs(ball.vectx); // Ball hit the right side of the brick
            }

            // Remove the brick after collision
            game.bricksLive.splice(index, 1);
            // brick.isdetroyed();
            brick.elem.style.visibility = "hidden";
        }
    });
}


main();