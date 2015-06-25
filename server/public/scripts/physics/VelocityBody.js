define(["physics/Vector2D", "physics/Constants"], function (Vector2D, Constants) {
    function VelocityBody(x, y) {
        this.position = new Vector2D(x, y);
        this.velocity = new Vector2D(0, 0);
        this.theta = 0;
    }

    // *********************X
    // *** PUBLIC METHODS ***
    // *********************X

    VelocityBody.prototype.move = function(dt, maxX, maxY) {
        // formula: x = x + dx * dt
        this.position.x += this.velocity.x * dt;
        this.position.y += this.velocity.y * dt;
        
        if (this.position.x <= 0) {
            this.position.x = maxX;
        } else if (this.position.x > maxY) {
            this.position.x = 0;
        }
        
        if (this.position.y <= 0) {
            this.position.y = maxX;
        } else if (this.position.y > maxY) {
            this.position.y = 0;
        }
    }
    
    VelocityBody.prototype.applyDrag = function (dt) {
        var xdf = this._getDragFactor(this.velocity.x);
        var ydf = this._getDragFactor(this.velocity.y);
        
        // apply drag once for every ms elapsed 
        // this way, drag is independent of framerate
        var ms = Math.round(dt);
        for (var i = 0; i < ms; i++) {
            this.velocity.x *= xdf;
            this.velocity.y *= ydf;
        }
    }
    
    // **********************X
    // *** PRIVATE METHODS ***
    // **********************X
    
    // where ds is the rate of change of dimension s
    VelocityBody.prototype._getDragFactor = function(ds) {
        var abs = Math.abs(ds);

        // these "drag factors" are fairly trivial...
        var dragFactor = 1;
        if (abs <= 5) {
            dragFactor = 0.99;
        } else if (abs > 5 && abs <= 7) {
            dragFactor = 0.95;
        } else if (abs > 7 && abs <= 8) {
            dragFactor = 0.9;
        } else if (abs > 8) {
            dragFactor = 0.8 - (abs - 8);
        }
        
        // ...and so fudging them isn't really a problem
        return 1 - ((1 - dragFactor) * Constants.dragMultipler);
    }

    return VelocityBody;
});