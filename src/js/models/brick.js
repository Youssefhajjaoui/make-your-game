export class Brick {
    constructor(container) {
        this.x = 0;
        this.y = 0;
        this.type = 1;
        this.elem = null;
        this.container = container;
        this.Isdetroyed = false;
    }

    renderBrick() {
        const container = document.querySelector('.container');
        const brick = document.createElement('div');
        brick.className = 'brick';
        container.append(brick);
        this.elem = brick;
        return brick
    }

}