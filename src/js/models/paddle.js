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
        let container = document.querySelector('.container');
        let containerWidth = container.getBoundingClientRect();
        let paddleWidth = this.elem.getBoundingClientRect().width;

        // Ensure the paddle doesn't move beyond the right edge of the container
        if (this.x + paddleWidth < containerWidth.width) {
            this.x += 20;
            this.elem.style.left = `${this.x}px`;
        }
    }

    moveLeft() {
        let container = document.querySelector('.container');
        let containerWidth = container.getBoundingClientRect();
        if (this.x > 0) {
            this.x -= 20;
            this.elem.style.left = `${this.x}px`;
        }
    }

    listener() {
        document.addEventListener('keydown', (event) => {
            switch (event.key) {
                case "ArrowLeft":
                    this.moveLeft();
                    break;
                case "ArrowRight":
                    this.moveRight();
                    break;
            }
        })
    }
}
