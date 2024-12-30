import { Ball } from "../models/ball.js";
import { Brick } from "../models/brick.js";
import { Paddle } from "../models/paddle.js";
import { levels } from "./utils.js";

export class Game {
    constructor(numLevel) {
        this.isPaused = false;
        this.isLose = false;
        this.bricksLive = [];
        this.currentLevel = numLevel;
        this.paddle = null;
        this.ball = null;
    }

    setup(numOfLevel) {
        let container = document.querySelector('.container');
        container.className = 'container';
        const paddle = new Paddle();
        const paddlelem = paddle.renderPaddle();
        const ball = new Ball();
        const ballelem = ball.renderBall();
        container.append(paddlelem);
        container.append(ballelem);
        const board = levels[numOfLevel];
        this.bricksLive = board.flatMap((row, i) =>
            row.map((brickType, j) => {
                if (brickType === 0) {
                    const brick = new Brick();
                    const brickelem = brick.renderBrick();
                    brick.type = brickType;
                    container.appendChild(brickelem);
                    brickelem.style.visibility = 'hidden';
                    return null
                };
                const brick = new Brick();
                const brickelem = brick.renderBrick();
                brick.type = brickType;
                container.appendChild(brickelem);
                return brick;
            }).filter(brick => brick !== null)
        );
        this.paddle = paddle;
        this.ball = ball;
        document.body.append(container);
        return { paddle, ball };
    }

    update() {
        this.checkCollisions();
        this.updateBallMovement();
    }

    collisionswithcontainer() {
        const container = document.querySelector(".container");
        const containerRect = container.getBoundingClientRect();
        const ball = this.ball;

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

    collisionWithPaddle() {
        const ball = this.ball;
        const paddle = this.paddle.elem.getBoundingClientRect();
        const ballElem = ball.elem.getBoundingClientRect();
        const ballRadius = ballElem.width / 2;

        // Calculate ball center coordinates
        const ballCenterX = ballElem.left + ballRadius;
        const ballCenterY = ballElem.top + ballRadius;

        // Calculate ball boundaries
        const ballLeft = ballCenterX - ballRadius;
        const ballRight = ballCenterX + ballRadius;
        const ballTop = ballCenterY - ballRadius;
        const ballBottom = ballCenterY + ballRadius;

        // Check for collision
        if (ballRight >= paddle.left &&
            ballLeft <= paddle.right &&
            ballBottom >= paddle.top &&
            ballTop <= paddle.bottom) {

            // Calculate hit position relative to paddle center
            const paddleWidth = paddle.right - paddle.left;
            const paddleCenter = paddle.left + (paddleWidth / 2);
            const hitOffset = ballCenterX - paddleCenter;
            const normalizedHitOffset = hitOffset / (paddleWidth / 2);  // Range: -1 to 1

            // Base speed and maximum angle (in radians)
            const baseSpeed = Math.sqrt(ball.vectx * ball.vectx + ball.vecty * ball.vecty);
            const maxBounceAngle = Math.PI / 3; // 60 degrees

            // Calculate new angle based on hit location
            const bounceAngle = normalizedHitOffset * maxBounceAngle;

            // Calculate new velocity components
            ball.vectx = baseSpeed * Math.sin(bounceAngle);
            ball.vecty = -baseSpeed * Math.cos(bounceAngle);

            // Add speed variation based on paddle movement (if paddle movement is tracked)
            if (this.paddle.velocity) {
                ball.vectx += this.paddle.velocity * 0.2;
            }

            // Add small random variation to prevent repetitive patterns
            const variation = (Math.random() - 0.5) * 0.2;
            ball.vectx += variation;

            // Ensure minimum vertical speed to prevent horizontal stalling
            const minVerticalSpeed = baseSpeed * 0.5;
            if (Math.abs(ball.vecty) < minVerticalSpeed) {
                ball.vecty = ball.vecty > 0 ? minVerticalSpeed : -minVerticalSpeed;
            }

            // Prevent the ball from getting stuck in the paddle
            ball.elem.style.top = (paddle.top - ballElem.height - 1) + 'px';
        }

        ball.move(ball.vectx, ball.vecty);
    }

    collisionWithBricks() {
        const ball = this.ball;
        const ballElem = ball.elem.getBoundingClientRect();
        const ballRadius = ballElem.width / 2;
        const ballCenterX = ballElem.left + ballRadius;
        const ballCenterY = ballElem.top + ballRadius;

        // Iterate over all live bricks
        this.bricksLive.forEach((brick, index) => {
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
                this.bricksLive.splice(index, 1);
                // brick.isdetroyed();
                brick.elem.style.visibility = "hidden";
            }
        });
    }

    updateBallMovement() {

    }

    isWin() {
        return this.bricksLive.length === 0;
    }

    isgameover() {
        return this.isLose;
    }
}