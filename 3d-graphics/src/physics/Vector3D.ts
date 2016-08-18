class Vector3D extends Vector2D {
    public z: number;
    
    constructor(x: number, y: number, z: number) {
        super(x, y);
        this.z = z;
    }
}
