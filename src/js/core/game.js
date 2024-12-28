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
                if (brickType === 0) return null;
                const brick = new Brick();
                const brickelem = brick.renderBrick();
                brick.type = brickType;
                container.appendChild(brickelem);
                return brickelem;
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

    checkCollisions() {

    }

    updateBallMovement() {

    }

    isWin() {
        return this.bricksLive.length === 0;
    }

    isGameOver() {
        return this.isLose;
    }
}