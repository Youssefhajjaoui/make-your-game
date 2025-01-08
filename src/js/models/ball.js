import { dimensions } from "./dimensions";

export class Ball {
    constructor(x, y) {
        this.x = 0;
        this.y = 0;
        this.elem = null;
        this.vectx = 0;
        this.vecty = -16;
        this.ballrect = null;
        this.radius = 7;
    }

    renderBall(padRect) {
        let container = document.querySelector('.container');
        const ball = document.createElement('div');
        ball.className = "ball";
        this.x = x;
        this.y = y;
        container.append(ball);
        const paddlelem = document.querySelector(".paddle");
        let ballrect = new dimensions(ball);
        this.x = padRect.right - (padRect.width / 2) - (ballrect.width / 2), this.y = padRect.top - ballrect.height;
        this.y =
            ball.style.left = `${this.x}px`;
        ball.style.top = `${this.y}px`;
        this.elem = ball;
        return ball
    }

    getCurrentPosition() {
        const computedStyle = window.getComputedStyle(this.elem);
        return {
            left: parseInt(computedStyle.left),
            top: parseInt(computedStyle.top)
        };
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
        this.x = paddle.right - (paddle.width / 2) - (this.ballrect.width / 2), this.y = paddle.top - this.ballrect.height;
        this.vectx = 0;
        this.vecty = 5;
        this.elem.style.left = `${this.x}px`;
        this.elem.style.top = `${this.y}px`;
    }

}