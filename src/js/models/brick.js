export class Brick {
    elem = any;
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.type = 1;
        this.elem = any;
        this.Isdetroyed = this.isdetroyed(x, y);
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
                this.elem.style.visibility = "hidden";
                this.Isdetroyed = true;
            }
            return true
        }
        return false
    }

}