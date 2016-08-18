class LightSource {
    public position: Vector3D;

    constructor(position: Vector3D) {
        this.position = position;
    }

    public getLightFactor(triangle: Triangle3D, position: Vector3D) : number {
        var center = triangle.getCenter(position);
        //var center = this.add(centerRelative, position);
        var normalPoint = triangle.normalPoint;
        //var normalPoint = this.add(normalPointRelative, position);

        var distanceToCenter = this.distanceBetween(this.position, center);
        var distanceToNormalPoint =  this.distanceBetween(this.position, normalPoint);

        var isFacingAway = distanceToNormalPoint > distanceToCenter;

        console.log("here");

        if(isFacingAway) {
            return 0;
        }

        // TODO implement a 0-1 factor based on the angle between triangle and this light source
        return 1;
    }

    private add(v1: Vector3D, v2: Vector3D) : Vector3D {
        return new Vector3D(v1.x + v2.x, v1.y + v2.y, v1.z + v2.z);
    }

    private distanceBetween(v1: Vector3D, v2: Vector3D) : number {
        var dx = v1.x - v2.x;
        var dy = v1.y - v2.y;
        var dz = v1.z - v2.z;

        return Math.sqrt((dx * dx) + (dy * dy) + (dz * dz));
    }
}
