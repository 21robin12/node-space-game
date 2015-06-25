﻿define(["physics/Vector2D"], function (Vector2D) {
    function Visualizer(canvasContext) {
        this.canvasContext = canvasContext;
    }
    
    Visualizer.prototype.draw = function (position, theta, pointsArray, color) {
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
    }
    
    return Visualizer;
});