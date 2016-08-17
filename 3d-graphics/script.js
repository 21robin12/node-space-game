function Vector2D(x, y) {
    var self = this;

    self.x = x;
    self.y = y;

    self.rotate = function (radians) {
        var x = (this.x * Math.cos(radians)) - (this.y * Math.sin(radians));
        var y = (this.x * Math.sin(radians)) + (this.y * Math.cos(radians));
        this.x = x;
        this.y = y;
    };
}

function Visualizer(canvasContext) {
    var self = this;

    self.canvasContext = canvasContext;

    self.draw = function (position, theta, pointsArray, color) {
        this.canvasContext.beginPath();
        var isFirst = true;

        for (var i = 0; i < pointsArray.length; i++) {

            // copy to avoid pass by reference
            var point = new Vector2D(pointsArray[i].x, pointsArray[i].y);
            point.rotate(theta);

            if (isFirst) {
                this.canvasContext.moveTo(point.x + position.x, point.y + position.y);
            } else {
                this.canvasContext.lineTo(point.x + position.x, point.y + position.y);
            }

            isFirst = false;
        }

        // final point to reconnect shape
        var lastPoint = new Vector2D(pointsArray[0].x, pointsArray[0].y);
        lastPoint.rotate(theta);
        this.canvasContext.lineTo(lastPoint.x + position.x, lastPoint.y + position.y);

        this.canvasContext.fillStyle = color;
        this.canvasContext.fill();
        this.canvasContext.stroke();
    };
}

function init() {
    var canvas = document.getElementById('canvas');
    var canvasContext = canvas.getContext('2d');
    var visualizer = new Visualizer(canvasContext);

    var ship = [new Vector2D(0, -20), new Vector2D(10, 10), new Vector2D(0, 5), new Vector2D(-10, 10)];
    visualizer.draw({x: 300, y: 300}, 0, ship, "#00FFFF");
}
