export class Paddle {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.elem = null;
        this.raduis = 50;
        this.border = window.innerHeight * 0.005;
    }

    renderPaddle() {
        let container = document.querySelector('.game-container');
        let containerrect = container.getBoundingClientRect();
        let paddle = document.createElement('div');
        paddle.className = "paddle";
        container.append(paddle);
        let paddlerect = paddle.getBoundingClientRect();
        this.x = (containerrect.right - (containerrect.width) / 2) - (paddlerect.width / 2)
        this.y = (container.clientHeight);
        paddle.style.left = `${this.x}px`;
        paddle.style.top = `${this.y}px`;
        this.elem = paddle;
        this.rect = paddle.getBoundingClientRect();
        return paddle;
    }

    moveRight() {
        let container = document.querySelector('.game-container');
        let containerRect = container.getBoundingClientRect();
        let paddleWidth = this.rect.width + this.border;
        let left = (window.innerWidth * 40) / 2700;
        // Ensure the paddle doesn't move beyond the right edge of the container
        if (this.x < (containerRect.right) - paddleWidth) {
            this.x += left;
            this.elem.style.left = `${Math.min(this.x, (containerRect.right - paddleWidth))}px`;
        }
    }

    moveLeft() {
        let container = document.querySelector('.game-container');
        let containerRect = container.getBoundingClientRect();
        let left = (window.innerWidth * 40) / 2700;
        if (this.x > containerRect.x) {
            this.x -= left;
            this.elem.style.left = `${Math.max(this.x, containerRect.left + this.border)}px`;
        }
    }


    keyDownHandler = (event) => {
        switch (event.key) {
            case "ArrowLeft":
                this.moveLeft();
                break;
            case "ArrowRight":
                this.moveRight();
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
