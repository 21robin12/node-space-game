class Triangle3D {
    public v1: Vector3D;
    public v2: Vector3D;
    public v3: Vector3D;
    public normalPoint: Vector3D;

    constructor(v1: Vector3D, v2: Vector3D, v3: Vector3D, normalPoint: Vector3D) {
        this.v1 = v1;
        this.v2 = v2;
        this.v3 = v3;
        this.normalPoint = normalPoint;
    }

    public project2D() : Triangle2D {
        return new Triangle2D(new Vector2D(this.v1.x, this.v1.y), new Vector2D(this.v2.x, this.v2.y), new Vector2D(this.v3.x, this.v3.y));
    }

    public getCenter(position: Vector3D) : Vector3D {
        // absolute positions shifted by position
        var v1a = this.add(this.v1, position);
        var v2a = this.add(this.v2, position);
        var v3a = this.add(this.v3, position);

        return new Vector3D((v1a.x + v2a.x + v3a.x) / 3, (v1a.y + v2a.y + v3a.y) / 3, (v1a.z + v2a.z + v3a.z) / 3);
    };

    // TODO reuse with LightSource
    private add(v1: Vector3D, v2: Vector3D) : Vector3D {
        return new Vector3D(v1.x + v2.x, v1.y + v2.y, v1.z + v2.z);
    }
}
