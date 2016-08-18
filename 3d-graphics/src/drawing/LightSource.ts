class LightSource {
    public position: Vector3D;
    
    constructor(position: Vector3D) {
        this.position = position;
    }
    
    public getLightFactor(triangle: Triangle3D) : number {
        var center = triangle.getCenter();
        var normalPoint = triangle.normalPoint;
        
        // TODO NOT WORKING! take into account POSITION of triangle, not just coordinates relative to center of object!
        var distanceToCenter = this.distanceBetween(this.position, center);
        var distanceToNormalPoint =  this.distanceBetween(this.position, normalPoint);
        
        if(distanceToNormalPoint > distanceToCenter) {
            return 0;
        }
        
        // TODO implement a 0-1 factor based on the angle between triangle and this light source
        return 1;
    }
    
    private distanceBetween(v1: Vector3D, v2: Vector3D) : number {
        var dx = v1.x - v2.x;
        var dy = v1.y - v2.y;
        var dz = v1.z - v2.z;
        
        return Math.sqrt((dx * dx) + (dy * dy) + (dz * dz));
    }
}
