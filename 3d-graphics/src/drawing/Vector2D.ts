class Vector2D {
    public x: number;
    public y: number;
    
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
    
    public rotate(radians: number) : void {
        var x = (this.x * Math.cos(radians)) - (this.y * Math.sin(radians));
        var y = (this.x * Math.sin(radians)) + (this.y * Math.cos(radians));
        this.x = x;
        this.y = y;
    }
}
