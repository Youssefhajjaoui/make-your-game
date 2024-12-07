export class Brick {
    constructor() {
        this.type = 0;
        this.elem = this.renderBrick(this.type);
        this.with = this.elem.getBoundingClientRect().right - this.elem.getBoundingClientRect().left;
        this.height = this.elem.getBoundingClientRect().y - this.elem.getBoundingClientRect().bottom;
    }

    renderBrick(type) {
        const container = document.querySelector('.container');
        const brick = document.createElement('div');
        brick.className = 'brick';
        container.append(brick);
        return brick
    }


}