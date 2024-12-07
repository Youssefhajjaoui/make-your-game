import { Ball } from "../models/ball.js";
import { Brick } from "../models/brick.js";
import { Paddle } from "../models/paddle.js";
import { levels } from "./utils.js";

export class Game {
    constructor(numlevel) {
        this.isPaused = false;
        this.isLose = false;
        this.bricksLive = [];
        this.Paddle, this.Ball = this.setup(numlevel)
    }

    setup(numOfLevel) {
        let paddle = new Paddle();
        let ball = new Ball();
        const board = levels[numOfLevel];
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board[i].length; j++) {
                let brick = new Brick();
                brick.type = board[i][j];
                if (board[i][j] === 0) {
                    brick.elem.style.visibility = "hidden";
                }
                this.bricksLive.push(brick);
            }
        }
        return paddle, ball
    }

    start() {
        
    }



}
