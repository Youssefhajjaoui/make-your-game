export class Paddle {
    constructor() {
        this.x = 350;
        this.y = 0;
        this.elem = null;
        this.raduis = 50;
    }

    renderPaddle() {
        let container = document.querySelector('.container');
        let paddle = document.createElement('div');
        paddle.className = "paddle";
        paddle.style.left = `${this.x}px`;
        container.append(paddle);
        this.elem = paddle;
        this.rect = paddle.getBoundingClientRect();
        return paddle;
    }

    moveRight() {
        let container = document.querySelector('.container');
        let containerWidth = container.getBoundingClientRect();
        let paddleWidth = this.elem.getBoundingClientRect().width;

        // Ensure the paddle doesn't move beyond the right edge of the container
        if (this.x + paddleWidth < containerWidth.width + 48) {
            this.x += 20;
            this.elem.style.left = `${this.x}px`;
        }
    }

    moveLeft() {
        let container = document.querySelector('.container');
        let containerWidth = container.getBoundingClientRect();
        if (this.x - 55 > 0) {
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
            console.log(this.x, this.y);
        })
    }
}
