export class Brick {
    constructor(x, y) {
        this.type = 1;
        this.elem = this.renderBrick(this.type);
        this.Isdetroyed = this.isdetroyed(x, y);
    }

    renderBrick(type) {
        const container = document.querySelector('.container');
        const brick = document.createElement('div');
        brick.className = 'brick';
        container.append(brick);
        return brick
    }

    isdetroyed() {
        // if (this.ballx < this.elem.getBoundingClientRect().right && this.ballx > this.elem.getBoundingClientRect().left && this.bally > this.elem.getBoundingClientRect().y && this.bally < this.elem.getBoundingClientRect().bottom) {
        //     this.elem.style.visibility = "hidden";
        // }
        const ball = document.querySelector('.ball');
        const brickRect = this.brick.getBoundingClientRect();
        const ballRect = ball.getBoundingClientRect();

        if (!this.Isdetroyed && (ballRect.y <= brickRect.bottom &&
            ballRect.x <= brickRect.right &&
            ballRect.right >= brickRect.x &&
            ballRect.bottom >= brickRect.y)) {
            this.elem.style.visibility = "hidden";
            return true
        }
        return false
    }

}