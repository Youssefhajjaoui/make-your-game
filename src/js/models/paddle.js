export class Paddle {
    constructor() {
        this.x = 100;
        this.y = 0;
        this.elem = this.renderPaddle();

        let rect = this.elem.getBoundingClientRect();
        this.width = rect.right - rect.left;
        this.height = rect.bottom - rect.top;

        this.y = document.querySelector('.container').offsetHeight - this.height - 10;
        this.elem.style.left = `${this.x}px`;
        this.elem.style.top = `${this.y}px`;
    }

    renderPaddle() {
        let container = document.querySelector('.container');
        let paddle = document.createElement('div');
        paddle.className = "paddle";
        container.append(paddle);
        return paddle;
    }

    moveRight() {
        let containerWidth = document.querySelector('.container').offsetWidth;
        if (this.x + this.width < containerWidth) {
            this.x += 10;
            this.elem.style.left = `${this.x}px`;
        }
    }

    moveLeft() {
        if (this.x > 0) {
            this.x -= 10;
            this.elem.style.left = `${this.x}px`;
        }
    }
}
