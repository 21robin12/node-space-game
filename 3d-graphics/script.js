function Vector3D(x, y, z) {
    var self = this;
    Vector2D.apply(this, [x, y]);
    
    self.z = z;
}

function Vector2D(x, y) {
    var self = this;

    self.x = x;
    self.y = y;
    
    // rotates vector in the x-y plane
    self.rotate = function (radians) {
        var x = (this.x * Math.cos(radians)) - (this.y * Math.sin(radians));
        var y = (this.x * Math.sin(radians)) + (this.y * Math.cos(radians));
        this.x = x;
        this.y = y;
    };
}

function Triangle3D(v1, v2, v3) {
    var self = this;
    
    self.v1 = v1;
    self.v2 = v2;
    self.v3 = v3;
    
    // orthogonal 2D projection onto the x-y plane
    self.project2D = function() {
        return new Triangle2D(new Vector2D(self.v1.x, self.v1.y), new Vector2D(self.v2.x, self.v2.y), new Vector2D(self.v3.x, self.v3.y));
    };
}

function Triangle2D(v1, v2, v3) {
    var self = this;
    
    self.v1 = v1;
    self.v2 = v2;
    self.v3 = v3;
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

function Pyramid(sf) {
    var self = this;
        
    var f1 = new Triangle3D(new Vector3D(-sf, 0, 0), new Vector3D(0, sf, 0), new Vector3D(0, 0, sf));
    var f2 = new Triangle3D(new Vector3D(0, 0, sf), new Vector3D(0, sf, 0), new Vector3D(sf, 0, 0));
    var f3 = new Triangle3D(new Vector3D(0, 0, sf), new Vector3D(sf, 0, 0), new Vector3D(0, -sf, 0));
    var f4 = new Triangle3D(new Vector3D(-sf, 0, 0), new Vector3D(0, 0, sf), new Vector3D(0, -sf, 0));
    
    self.faces = [f1, f2, f3, f4];
    
    self.draw = function(position, theta, visualizer, color) {
        for(var i = 0; i < self.faces.length; i++) {
            var triangle2D = self.faces[i].project2D();
            var pointsArray = [triangle2D.v1, triangle2D.v2, triangle2D.v3];
            visualizer.draw(position, theta, pointsArray, color);            
        }
    };
}

function init() {
    var canvas = document.getElementById('canvas');
    var canvasContext = canvas.getContext('2d');
    var visualizer = new Visualizer(canvasContext);

    var ship = [new Vector2D(0, -20), new Vector2D(10, 10), new Vector2D(0, 5), new Vector2D(-10, 10)];
    visualizer.draw({x: 300, y: 300}, 0, ship, "#00FFFF");
    
    var pyramid = new Pyramid(36);
    pyramid.draw({x: 450, y: 450}, 0, visualizer, "#00FFFF");
}
