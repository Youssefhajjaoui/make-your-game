export class Ball {
    constructor(x, y) {
        this.x = 0;
        this.y = 0;
        this.elem = this.renderBall();
        this.vectx = 0;
        this.vecty = 2;
        this.radius = 7;
    }

    renderBall() {
        let container = document.querySelector('.container');
        const ball = document.createElement('div');
        ball.className = "ball";
        ball.style.left = this.x;
        ball.style.top = this.y;
        container.append(ball);
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
        this.elem.style.left = `${this.x}px`;
        this.elem.style.top = `${this.y}px`;
    }

}