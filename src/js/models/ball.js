export class ball {
    constructor() {
        this.x = window.innerWidth / 2;
        this.y = window.innerHeight / 2;
    }

    renderBall(type) {
        const ball = document.createElement('div');
        ball.className = "ball";
        ball.style.left = this.x;
        ball.style.top = this.y;
        document.body.append(ball);
    }

}