class Pyramid {
    public faces: Triangle3D[];
    public position: Vector3D;

    constructor(sf: number, position: Vector3D) {
        let nd = (sf / 3) * 1.01;
        let f1 = new Triangle3D(new Vector3D(-sf, 0, 0), new Vector3D(0, sf, 0), new Vector3D(0, 0, sf), new Vector3D(-nd, nd, nd));
        let f2 = new Triangle3D(new Vector3D(0, 0, sf), new Vector3D(0, sf, 0), new Vector3D(sf, 0, 0), new Vector3D(nd, nd, nd));
        let f3 = new Triangle3D(new Vector3D(0, 0, sf), new Vector3D(sf, 0, 0), new Vector3D(0, -sf, 0), new Vector3D(nd, -nd, nd));
        let f4 = new Triangle3D(new Vector3D(-sf, 0, 0), new Vector3D(0, 0, sf), new Vector3D(0, -sf, 0), new Vector3D(-nd, -nd, nd));
        this.faces = [f1, f2, f3, f4];
        this.position = position;
    }

    public draw(theta: number, visualizer: Visualizer, lightSource: LightSource) : void {
        for(var i = 0; i < this.faces.length; i++) {
            let triangle2D = this.faces[i].project2D();
            let pointsArray = [triangle2D.v1, triangle2D.v2, triangle2D.v3];

            var lf = lightSource.getLightFactor(this.faces[i], this.position);
            var color = lf == 1 ? "#00FFFF" : "#006C6C";

            visualizer.draw(this.position, theta, pointsArray, color);
        }
    }
}
