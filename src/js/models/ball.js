export class Ball {
    constructor(x, y) {
        this.x = 0;
        this.y = 0;
        this.elem = null;
        this.vectx = 0;
        this.vecty = 2;
        this.radius = 7;
    }

    renderBall(x, y) {
        let container = document.querySelector('.container');
        const ball = document.createElement('div');
        ball.className = "ball";
        this.x =x;
        this.y = y;
        ball.style.left = `${this.x}px`;
        ball.style.top = `${this.y}px`;
        container.append(ball);
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
        // Update coordinates
        this.x += vectx;
        this.y += vecty;

        // Update element position
        this.elem.style.left = `${this.x}px`;
        this.elem.style.top = `${this.y}px`;
    }

    // Optional: method to reset position
    reset() {
        this.x = window.innerWidth / 2;
        this.y = window.innerHeight / 2;
        this.vectx = 0;
        this.vecty = -5;
        this.elem.style.left = `${this.x}px`;
        this.elem.style.top = `${this.y}px`;
    }

}