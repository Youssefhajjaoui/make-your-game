export class Paddle {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.elem = null;
        this.raduis = 50;
    }

    renderPaddle() {
        let container = document.querySelector('.game-container');
        let paddle = document.createElement('div');
        paddle.className = "paddle";
        this.x = (container.clientWidth /2);
        this.y = (container.clientHeight);
        paddle.style.left = `${this.x}px`;
        paddle.style.top = `${this.y}px`;
        container.append(paddle);
        this.elem = paddle;
        this.rect = paddle.getBoundingClientRect();
        return paddle;
    }

    moveRight() {
        let container = document.querySelector('.game-container');
        let containerRect = container.getBoundingClientRect();
        let paddleWidth = this.rect.width;
        console.log("paddleWidth:",paddleWidth);
        console.log("containerWidth:",containerRect.width);
        console.log("this.x:",this.x);
        // Ensure the paddle doesn't move beyond the right edge of the container
        if (this.x <= containerRect.width- (paddleWidth /2)) {
            this.x += 2;
            this.elem.style.left = `${this.x}px`;
        }
    }

    moveLeft() {
        let container = document.querySelector('.game-container');
        let containerRect = container.getBoundingClientRect();
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
            console.log(this.x, this.y);
        })
    }
}
