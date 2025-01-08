class dimensions {
    constructor(element){
        let rect = element.getBoundingClientRect();
        this.x = rect.x;
        this.y = rect.y;
        this.width = rect.width;
        this.height = rect.height;
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