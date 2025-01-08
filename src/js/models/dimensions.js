class dimensions {
    constructor(element){
        let rect = element.getBoundingClientRect();
        this.x = rect.x;
        this.y = rect.y;
        this.width = this.width;
        this.height = this.height;
        this.top = rect.top;
        this.right = rect.right;
        this.bottom = rect.bottom;
        this.left = rect.left;
    }

    update = (dimensions) => {
        let keys = Object.keys(dimensions);
        keys.forEach(key => {
            this[key] = dimensions[key];
        });
    }
}



export {dimensions}