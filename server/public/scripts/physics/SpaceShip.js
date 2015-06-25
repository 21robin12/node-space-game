define(["physics/Vector2D", "physics/VelocityBody", "physics/Constants"], function (Vector2D, VelocityBody, Constants) {
    function SpaceShip(x, y) {
        this.position = new Vector2D(x, y);
        this.velocity = new Vector2D(0, 0);
        this.theta = 0;
    }
    
    SpaceShip.prototype = new VelocityBody();
    SpaceShip.prototype.constructor = SpaceShip;
    
    // accelerate along theta
    SpaceShip.prototype.accelerate = function (dt) {
        var a = Constants.spaceShipAcceleration;
        var ddx = a * Math.sin(this.theta);
        var ddy = -(a * Math.cos(this.theta));
        
        // v = u + at
        this.velocity.x += ddx * dt;
        this.velocity.y += ddy * dt;
    }
    
    SpaceShip.prototype.rotateClockwise = function(dt) {
        this.theta += dt * Constants.spaceShipRotationVelocity;
    }
    
    SpaceShip.prototype.rotateAnticlockwise = function (dt) {
        this.theta -= dt * Constants.spaceShipRotationVelocity;
    }

    return SpaceShip;
});