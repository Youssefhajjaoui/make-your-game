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
        this.player = null;
        this.container = document.querySelector('.container');
        this.score = document.querySelector('.score');
        this.level = document.querySelector('.level');
        this.livesContainer = document.querySelector('.lives-container');
        this.gameContainer = document.querySelector('.game-container');
        this.bricksContainer = document.querySelector('.bricks-container');
        this.overlay = document.querySelector('.overlay');
    }

    setup() {
        this.updateHeader();
        const paddle = new Paddle();
        const paddlelem = paddle.renderPaddle();
        const ball = new Ball();
        const ballelem = ball.renderBall();
        this.gameContainer.append(paddlelem);
        this.gameContainer.append(ballelem);
        const board = levels[this.currentLevel];
        this.bricksLive = board.flatMap((row, i) =>
            row.map((brickType, j) => {
                if (brickType === 0) {
                    const brick = new Brick();
                    const brickelem = brick.renderBrick();
                    brick.type = brickType;
                    this.bricksContainer.appendChild(brickelem);
                    brickelem.style.visibility = 'hidden';
                    return null
                };
                const brick = new Brick();
                const brickelem = brick.renderBrick();
                brick.type = brickType;
                this.bricksContainer.appendChild(brickelem);
                return brick;
            }).filter(brick => brick !== null)
        );
        this.paddle = paddle;
        this.ball = ball;
        return { paddle, ball };
    }

    update() {
        this.checkCollisions();
        this.updateBallMovement();
    }

    collisionswithcontainer() {
        const containerRect = this.gameContainer.getBoundingClientRect();
        
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
            this.player.lives--;
            ball.elem.remove();
            this.ball = new Ball;
            this.ball.renderBall();
            this.isPaused = true;
            return
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

            const paddleWidth = paddle.right - paddle.left;
            const paddleCenter = paddle.left + (paddleWidth / 2);
            const hitOffset = ballCenterX - paddleCenter;
            const normalizedHitOffset = hitOffset / (paddleWidth / 2);

            const baseSpeed = Math.sqrt(ball.vectx * ball.vectx + ball.vecty * ball.vecty);
            const maxBounceAngle = Math.PI / 3;

            const bounceAngle = normalizedHitOffset * maxBounceAngle;

            ball.vectx = baseSpeed * Math.sin(bounceAngle);
            ball.vecty = -baseSpeed * Math.cos(bounceAngle);

            if (this.paddle.velocity) {
                ball.vectx += this.paddle.velocity * 0.2;
            }

            const variation = (Math.random() - 0.5) * 0.2;
            ball.vectx += variation;

            const minVerticalSpeed = baseSpeed * 0.5;
            if (Math.abs(ball.vecty) < minVerticalSpeed) {
                ball.vecty = ball.vecty > 0 ? minVerticalSpeed : -minVerticalSpeed;
            }

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

        this.bricksLive.forEach((brick, index) => {
            const brickRect = brick.elem.getBoundingClientRect();

            if (
                ballCenterX + ballRadius >= brickRect.left &&
                ballCenterX - ballRadius <= brickRect.right &&
                ballCenterY + ballRadius >= brickRect.top &&
                ballCenterY - ballRadius <= brickRect.bottom
            ) {
                this.player.score += 10;
                const overlapLeft = Math.abs(ballCenterX + ballRadius - brickRect.left);
                const overlapRight = Math.abs(ballCenterX - ballRadius - brickRect.right);
                const overlapTop = Math.abs(ballCenterY + ballRadius - brickRect.top);
                const overlapBottom = Math.abs(ballCenterY - ballRadius - brickRect.bottom);

                const minOverlap = Math.min(overlapLeft, overlapRight, overlapTop, overlapBottom);

                if (minOverlap === overlapTop) {
                    ball.vecty = -Math.abs(ball.vecty);
                } else if (minOverlap === overlapBottom) {
                    ball.vecty = Math.abs(ball.vecty);
                } else if (minOverlap === overlapLeft) {
                    ball.vectx = -Math.abs(ball.vectx);
                } else if (minOverlap === overlapRight) {
                    ball.vectx = Math.abs(ball.vectx);
                }

                this.bricksLive.splice(index, 1);
                brick.elem.style.visibility = "hidden";
            }
        });
    }

    gameover() {
        let dashbord = document.getElementById('game-over-dashboard');
        let score = dashbord.querySelector('.game-over-score');
        score.textContent = `Score: ${this.player.score}`;
        dashbord.style.display = 'block';
        this.overlay.style.display = 'block';
    }
    updateHeader() {
        this.livesContainer.innerHTML = '';
        for (let i = 0; i < this.player.lives; i++) {
            const life = document.createElement('img');
            life.classList.add('heart');
            life.src = 'assets/icons/life.png';
            this.livesContainer.appendChild(life);
        }
        this.score.textContent = `Score: ${this.player.score}`;
        this.level.textContent = `Level: ${this.currentLevel}`;

    }
    iswin() {
        return this.bricksLive.length === 0;
    }
}