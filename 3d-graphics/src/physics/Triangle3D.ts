class Triangle3D {
    public v1: Vector3D;
    public v2: Vector3D;
    public v3: Vector3D;
    
    constructor(v1: Vector3D, v2: Vector3D, v3: Vector3D) {
        this.v1 = v1;
        this.v2 = v2;
        this.v3 = v3;
    }
    
    public project2D() : Triangle2D {
        return new Triangle2D(new Vector2D(this.v1.x, this.v1.y), new Vector2D(this.v2.x, this.v2.y), new Vector2D(this.v3.x, this.v3.y));
    }
    // TODO reimplement this
    /*
    self.getCenter = function() {
        return new Vector3D((self.v1.x + self.v2.x + self.v3.x) / 3, (self.v1.y + self.v2.y + self.v3.y) / 3, (self.v1.z + self.v2.z + self.v3.z) / 3);
    };
    */
}
