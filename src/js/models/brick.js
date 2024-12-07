export class brick {
    constructor() {
        this.type = 0;
    }

    renderBrick(type) {
        const container = document.querySelector('.container');
        const brick = document.createElement('div');
        brick.className = 'brick';
        brick.setAttribute('type', `${this.type}`);
        container.append(brick);
    }

    
}