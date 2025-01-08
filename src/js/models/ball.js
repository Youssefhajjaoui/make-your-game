export class Ball {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.elem = null;
        this.vectx = 0;
        this.vecty = -16;
        this.radius = 7;
        this.container = document.querySelector('.game-container');
        this.containerDimensions = new dimensions(this.container);
    }

    renderBall(x, y) {
        let container = document.querySelector('.game-container');
        const ball = document.createElement('div');
        ball.className = "ball";
        this.x = x;
        this.y = y;
        container.append(ball);
        const paddlelem = document.querySelector(".paddle");
        let ballrect = ball.getBoundingClientRect();
        let pdRect = paddlelem.getBoundingClientRect();
        this.x = pdRect.right - (pdRect.width / 2) - (ballrect.width / 2), this.y = pdRect.top - ballrect.height;
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
    reset() {
        const paddlelem = document.querySelector(".paddle");
        let ballrect = this.elem.getBoundingClientRect();
        let pdRect = paddlelem.getBoundingClientRect();
        this.x = pdRect.right - (pdRect.width / 2) - (ballrect.width / 2), this.y = pdRect.top - ballrect.height;
        this.vectx = 0;
        this.vecty = 5;
        this.elem.style.left = `${this.x}px`;
        this.elem.style.top = `${this.y}px`;
    }

}