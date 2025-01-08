import { dimensions } from "./dimensions.js";

export class Paddle {
    constructor(containerRect, container) {
        this.x = 0;
        this.y = 0;
        this.elem = null;
        this.border = window.innerHeight * 0.005;
        this.dimensions = null;
        this.renderPaddle(containerRect, container);
        this.listener();
    }

    renderPaddle(containerrect, container) {
        let paddle = document.createElement('div');
        paddle.className = "paddle";
        container.append(paddle);
        this.dimensions = new dimensions(paddle);
        this.x = (containerrect.right - (containerrect.width) / 2) - (this.dimensions.width / 2)
        this.y = (container.getBoundingClientRect().bottom - this.dimensions.height) - window.innerHeight * 0.01;
        paddle.style.left = `${this.x}px`;
        paddle.style.top = `${this.y}px`;
        this.elem = paddle;
    }

    moveRight(containerRect) {
        let paddleWidth = this.dimensions.width + this.border;
        let left = (window.innerWidth * 40) / 2700;
        if (this.x < (containerRect.right) - paddleWidth) {
            this.x += left;
            this.elem.style.left = `${Math.min(this.x, (containerRect.right - paddleWidth))}px`;
            this.dimensions.update({
                x: Math.min(this.x, (containerRect.right - paddleWidth)),
                left: Math.min(this.x, (containerRect.right - paddleWidth)),
                right: Math.min(this.x, (containerRect.right - paddleWidth)) + paddleWidth,
            });
        }
    }

    moveLeft(containerRect) {
        let paddleWidth = this.dimensions.width + this.border;
        let left = (window.innerWidth * 40) / 2700;
        if (this.x > containerRect.x) {
            this.x -= left;
            this.elem.style.left = `${Math.max(this.x, containerRect.left + this.border)}px`;
            this.dimensions.update({
                x: Math.max(this.x, containerRect.left + this.border),
                left: Math.max(this.x, containerRect.left + this.border),
                right: Math.max(this.x, containerRect.left + this.border) + paddleWidth,
            });
        }
    }


    keyDownHandler(container, event) {        
        switch (event.value) {
            case "ArrowLeft":
                this.moveLeft(container);
                break;
            case "ArrowRight":
                this.moveRight(container);
                break;
            default:
                break;
        }
    }



    listener() {
        document.addEventListener('keydown', this.keyDownHandler);
    }

    removeListener() {
        document.removeEventListener('keydown', this.keyDownHandler);
    }
}
