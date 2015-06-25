define(function () {
    function Vector2D(x, y) {
        this.x = x;
        this.y = y;
    }
    
    Vector2D.prototype.rotate = function (radians) {
        var x = (this.x * Math.cos(radians)) - (this.y * Math.sin(radians));
        var y = (this.x * Math.sin(radians)) + (this.y * Math.cos(radians));
        this.x = x;
        this.y = y;
    }

    return Vector2D;
});