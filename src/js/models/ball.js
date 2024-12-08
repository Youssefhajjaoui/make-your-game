export class Ball {
    constructor() {
        this.x = window.innerWidth / 2;
        this.y = window.innerHeight / 2;
        this.elem = this.renderBall();
        this.speed = 2;
        this.vectx = 0;
        this.vecty = 2;
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

    move() {
        this.x += this.vectx;
        this.y += this.vecty;
    }

}