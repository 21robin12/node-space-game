define(["physics/Vector2D"], function (Vector2D) {
    function PointArray() { }
    
    PointArray.spaceShip = [new Vector2D(0, -20), new Vector2D(10, 10), new Vector2D(0, 5), new Vector2D(-10, 10)];
    
    return PointArray;
});