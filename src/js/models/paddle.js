import { dimensions } from "./dimensions.js";

export class Paddle {
    constructor(containerDimensions, container) {
        this.x = 0;
        this.y = 0;
        this.paddle = null;
        this.border = window.innerHeight * 0.005;
        this.dimensions = null;
        this.containerDimensions = containerDimensions;
        this.renderPaddle(containerDimensions, container);
        this.listener();
    }

    renderPaddle(containerDimensions, container) {
        const paddle = document.createElement('div');
        paddle.className = "paddle";
        container.append(paddle);

        this.dimensions = new dimensions(paddle);

        this.x = (containerDimensions.right - (containerDimensions.width / 2)) - (this.dimensions.width / 2);
        this.y = (container.getBoundingClientRect().bottom - this.dimensions.height) - window.innerHeight * 0.01;

        paddle.style.left = `${this.x}px`;
        paddle.style.top = `${this.y}px`;

        this.dimensions.update({
            x: this.x,
            y: this.y,
            left: this.x,
            top: this.y,
            right: this.x + this.dimensions.width,
            bottom: this.y + this.dimensions.height,
        });

        this.paddle = paddle;
    }


    moveRight(containerRect) {
        const paddleWidth = this.dimensions.width + this.border;
        const moveStep = (window.innerWidth * 40) / 2700;

        if (this.x < containerRect.right - paddleWidth) {
            this.x += moveStep;

            const newX = Math.min(this.x, containerRect.right - paddleWidth);
            this.paddle.style.left = `${newX}px`;

            this.dimensions.update({
                x: newX,
                left: newX,
                right: newX + paddleWidth,
            });
        }
    }


    moveLeft(containerRect) {
        const paddleWidth = this.dimensions.width + this.border;
        const moveStep = (window.innerWidth * 40) / 2700;

        if (this.x > containerRect.left) {
            this.x -= moveStep;

            const newX = Math.max(this.x, containerRect.left + this.border);
            this.paddle.style.left = `${newX}px`;

            this.dimensions.update({
                x: newX,
                left: newX,
                right: newX + paddleWidth,
            });
        }
    }



    keyDownHandler = (event) => {
        switch (event.key) {
            case "ArrowLeft":
                this.moveLeft(this.containerDimensions);
                break;
            case "ArrowRight":
                this.moveRight(this.containerDimensions);
                break;
            default:
                break;
        }
    };




    listener() {
        document.addEventListener('keydown', this.keyDownHandler.bind(this));
    }

    removeListener() {
        document.removeEventListener('keydown', this.keyDownHandler);
    }
}
