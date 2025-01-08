export class Brick {
    constructor(container) {
        this.x = x;
        this.y = y;
        this.type = 1;
        this.elem = null;
        this.container = container;
        this.Isdetroyed = false;
    }

    renderBrick(type) {
        const container = document.querySelector('.container');
        const brick = document.createElement('div');
        brick.className = 'brick';
        container.append(brick);
        this.elem = brick
        return brick
    }

    isdetroyed() {
        const ball = document.querySelector('.ball');
        const brickRect = this.brick.getBoundingClientRect();
        const ballRect = ball.getBoundingClientRect();

        if (!this.Isdetroyed && (ballRect.y <= brickRect.bottom &&
            ballRect.x <= brickRect.right &&
            ballRect.right >= brickRect.x &&
            ballRect.bottom >= brickRect.y)) {
            this.type--;
            if (this.type === 0) {
                this.elem.style.transition = "opacity 0.5s";
                this.elem.style.opacity = "0";
                this.Isdetroyed = true;
            }
            return true
        }
        return false
    }

}