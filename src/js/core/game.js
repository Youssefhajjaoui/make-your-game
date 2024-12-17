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
        const { paddle, ball } = this.setup(numLevel);
        this.paddle = paddle;
        this.ball = ball;
    }

    setup(numOfLevel) {
        const paddle = new Paddle();
        const ball = new Ball();
        ball.x=paddle.re

        const board = levels[numOfLevel];

        this.bricksLive = board.flatMap((row, i) => 
            row.map((brickType, j) => {
                if (brickType === 0) return null;
                
                const brick = new Brick();
                brick.type = brickType;
                return brick;
            }).filter(brick => brick !== null)
        );

        return { paddle, ball };
    }

    start() {
        this.paddle.listener();
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