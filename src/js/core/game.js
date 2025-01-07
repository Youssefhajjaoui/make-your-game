import { Ball } from "../models/ball.js";
import { Brick } from "../models/brick.js";
import { Paddle } from "../models/paddle.js";
import { levels } from "./utils.js";

export class Game {
    constructor() {
        this.chrono = 0;
        this.interval = null;
        this.isPaused = false;
        this.isLose = false;
        this.bricksLive = [];
        this.currentLevel = 0;
        this.paddle = null;
        this.ball = null;
        this.player = null;
        this.time = document.querySelector('.time');
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

        const fragment = document.createDocumentFragment();
        const paddle = new Paddle();
        const ball = new Ball();
        const paddleElem = paddle.renderPaddle();
        const ballElem = ball.renderBall();
        fragment.appendChild(paddleElem);
        fragment.appendChild(ballElem);
        this.gameContainer.appendChild(fragment);

        paddle.listener();
        this.setupbricks();

        this.paddle = paddle;
        this.ball = ball;

    }


    setupbricks() {
        const board = levels[this.currentLevel];
        const fragment = document.createDocumentFragment();

        this.bricksLive = board.flatMap((row, i) =>
            row.map((brickType, j) => {
                const brick = new Brick();
                const brickElem = brick.renderBrick();
                brick.type = brickType;

                if (brickType === 0) {
                    brickElem.classList.add('null-brick');
                }

                fragment.appendChild(brickElem);
                return brickType === 0 ? null : brick;
            }).filter(brick => brick !== null)
        );

        this.bricksContainer.appendChild(fragment);
    }



    checkCollisions() {
        const ball = this.ball;
        const ballRect = ball.elem.getBoundingClientRect();
        const ballRadius = ballRect.width / 2;
        const ballCenterX = ballRect.left + ballRadius;
        const ballCenterY = ballRect.top + ballRadius;

        // Container collision
        const containerRect = this.gameContainer.getBoundingClientRect();
        const border = 0.005 * window.innerHeight;

        if (ball.x + ballRect.width >= containerRect.right - border) {
            ball.vectx = -Math.abs(ball.vectx);
        } else if (ball.x <= containerRect.left + border) {
            ball.vectx = Math.abs(ball.vectx);
        }

        if (ball.y <= containerRect.top + border) {
            ball.vecty = Math.abs(ball.vecty);
        } else if (ball.y + ballRect.width >= containerRect.bottom - border) {
            this.player.lives--;
            ball.elem.remove();
            this.ball = new Ball();
            this.ball.renderBall();
            this.isPaused = true;
            return;
        }

        // Paddle collision
        const paddleRect = this.paddle.elem.getBoundingClientRect();
        if (ballCenterY + ballRadius >= paddleRect.top &&
            ballCenterY - ballRadius <= paddleRect.bottom &&
            ballCenterX + ballRadius >= paddleRect.left &&
            ballCenterX - ballRadius <= paddleRect.right) {

            const hitOffset = ballCenterX - (paddleRect.left + paddleRect.width / 2);
            const baseSpeed = Math.hypot(ball.vectx, ball.vecty);
            const bounceAngle = (hitOffset / (paddleRect.width / 2)) * (Math.PI / 3);

            ball.vectx = baseSpeed * Math.sin(bounceAngle) + (this.paddle.velocity || 0) * 0.2;
            ball.vecty = -baseSpeed * Math.cos(bounceAngle);

            // Ensure minimum vertical speed
            const minSpeed = baseSpeed * 0.5;
            if (Math.abs(ball.vecty) < minSpeed) {
                ball.vecty = ball.vecty > 0 ? minSpeed : -minSpeed;
            }

            ball.elem.style.top = `${paddleRect.top - ballRect.height - 1}px`;
        }

        // Brick collision
        for (let i = this.bricksLive.length - 1; i >= 0; i--) {
            const brick = this.bricksLive[i];
            const brickRect = brick.elem.getBoundingClientRect();

            if (ballCenterX + ballRadius >= brickRect.left &&
                ballCenterX - ballRadius <= brickRect.right &&
                ballCenterY + ballRadius >= brickRect.top &&
                ballCenterY - ballRadius <= brickRect.bottom) {

                this.player.score += 10;

                // Simple collision response based on ball position relative to brick center
                const fromCenter = {
                    x: ballCenterX - (brickRect.left + brickRect.width / 2),
                    y: ballCenterY - (brickRect.top + brickRect.height / 2)
                };

                if (Math.abs(fromCenter.x) > Math.abs(fromCenter.y)) {
                    ball.vectx = fromCenter.x > 0 ? Math.abs(ball.vectx) : -Math.abs(ball.vectx);
                } else {
                    ball.vecty = fromCenter.y > 0 ? Math.abs(ball.vecty) : -Math.abs(ball.vecty);
                }

                this.bricksLive.splice(i, 1);
                brick.elem.style.visibility = "hidden";
                break;
            }
        }

        ball.move(ball.vectx, ball.vecty);
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
            const life = document.createElement('span');
            life.classList.add('heart');
            life.textContent = '💙';
            this.livesContainer.appendChild(life);
        }

        this.time.textContent = `time: ${Math.floor(this.chrono / 60)}:${(this.chrono % 60).toString().padStart(2, '0')}`;
        this.score.textContent = `Score: ${this.player.score}`;
        this.level.textContent = `Level: ${this.currentLevel}`;

    }
    isWin() {
        return this.bricksLive.length === 0;
    }
    listenertoreseize() {
        const reloadOnResize = debounce(() => {
            window.location.reload();
        }, 200);

        window.addEventListener('resize', reloadOnResize);
    }

    addchrono() {
        this.stopchrono(this.interval);
        this.interval = setInterval(() => {
            this.chrono++;
        }, 1000)
    }
    stopchrono() {
        clearInterval(this.interval);
    }
}

function debounce(func, delay) {
    let timeout;
    return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            func(...args);
        }, delay);
    };
}
