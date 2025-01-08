import { dimensions } from "./dimensions.js";

export class Ball {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.elem = null;
        this.vectx = 0;
        this.vecty = -16;
        this.radius = 7;
        this.dimensions = null;
    }

    renderBall(padRect) {
        let container = document.querySelector('.game-container');
        const ball = document.createElement('div');
        ball.className = "ball";
        container.append(ball);
        const paddlelem = document.querySelector(".paddle");
        this.dimensions = new dimensions(ball);
        this.x = padRect.right - (padRect.width / 2) - (this.dimensions.width / 2), this.y = padRect.top - this.dimensions.height;
        this.y =
            ball.style.left = `${this.x}px`;
        ball.style.top = `${this.y}px`;
        this.elem = ball;
        return ball
    }


    move(vectx, vecty) {
        this.x += vectx;
        this.y += vecty;

        this.elem.style.left = `${this.x}px`;
        this.elem.style.top = `${this.y}px`;
    }

    // Optional: method to reset position
    reset(paddle) {
        const paddlelem = document.querySelector(".paddle");
        this.x = paddle.right - (paddle.width / 2) - (this.dimensions.width / 2), this.y = paddle.top - this.dimensions.height;
        this.vectx = 0;
        this.vecty = 5;
        this.elem.style.left = `${this.x}px`;
        this.elem.style.top = `${this.y}px`;
    }

}