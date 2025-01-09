import { dimensions } from "./dimensions.js";

export class Ball {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.elem = null;
        this.vectx = 0;
        this.vecty = -4;
        this.radius = 7;
        this.dimensions = null;
    }

    renderBall(paddleDimensions, container) {
        const ball = document.createElement('div');
        ball.className = "ball";
        container.append(ball);

        this.dimensions = new dimensions(ball);

        this.x = paddleDimensions.right - (paddleDimensions.width / 2) - (this.dimensions.width / 2);
        this.y = paddleDimensions.top - this.dimensions.height;

        ball.style.left = `${this.x}px`;
        ball.style.top = `${this.y}px`;

        this.dimensions.update({
            x: this.x,
            y: this.y,
            top: this.y,
            left: this.x,
            right: this.x + this.dimensions.width,
            bottom: this.y + this.dimensions.height,
        });
        //console.log(this.dimensions);

        this.elem = ball;
    }



    move(vectx, vecty) {
        this.x += vectx;
        this.y += vecty;

        this.elem.style.left = `${this.x}px`;
        this.elem.style.top = `${this.y}px`;

        this.dimensions.update({
            x: this.x,
            y: this.y,
            left: this.x,
            top: this.y,
            right: this.x + this.dimensions.width,
            bottom: this.y + this.dimensions.height,
        });
    }


    reset(paddle) {

        this.x = paddle.right - (paddle.width / 2) - (this.dimensions.width / 2), this.y = paddle.top - this.dimensions.height;
        this.elem.style.left = `${this.x}px`;
        this.elem.style.top = `${this.y}px`;
        paddle.update({
            x: this.x,
            y: this.y,
            left: this.x,
            top: this.y,
            right: this.x + this.dimensions.width,
            bottom: this.y + this.dimensions.height,
        });
    }

}