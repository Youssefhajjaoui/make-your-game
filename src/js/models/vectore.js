export class Vector2D {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }

    add(vector) {
        this.x += vector.x;
        this.y += vector.y;
    }

    distance(vector) {
        return Math.sqrt(
            Math.pow(this.x - vector.x, 2) + 
            Math.pow(this.y - vector.y, 2)
        );
    }
}