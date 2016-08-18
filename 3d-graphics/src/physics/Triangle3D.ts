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

    public getCenter() : Vector3D {
        return new Vector3D((this.v1.x + this.v2.x + this.v3.x) / 3, (this.v1.y + this.v2.y + this.v3.y) / 3, (this.v1.z + this.v2.z + this.v3.z) / 3);
    };
    
}
