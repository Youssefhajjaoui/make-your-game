export class Brick {
    constructor(x, y) {
        this.type = 0;
        this.elem = this.renderBrick(this.type);
        this.Isdetroyed = this.isdetroyed(x, y)
        this.ballx = x;
        this.bally = y;
    }

    renderBrick(type) {
        const container = document.querySelector('.container');
        const brick = document.createElement('div');
        brick.className = 'brick';
        container.append(brick);
        return brick
    }

    isdetroyed() {
        if (this.ballx < this.elem.getBoundingClientRect().right && this.ballx > this.elem.getBoundingClientRect().left && this.bally > this.elem.getBoundingClientRect().y && this.bally < this.elem.getBoundingClientRect().bottom) {
            this.elem.style.visibility = "hidden";
        }
    }

}