class Pyramid {
    public faces: Triangle3D[];
    
    constructor(sf: number) {
        let f1 = new Triangle3D(new Vector3D(-sf, 0, 0), new Vector3D(0, sf, 0), new Vector3D(0, 0, sf));
        let f2 = new Triangle3D(new Vector3D(0, 0, sf), new Vector3D(0, sf, 0), new Vector3D(sf, 0, 0));
        let f3 = new Triangle3D(new Vector3D(0, 0, sf), new Vector3D(sf, 0, 0), new Vector3D(0, -sf, 0));
        let f4 = new Triangle3D(new Vector3D(-sf, 0, 0), new Vector3D(0, 0, sf), new Vector3D(0, -sf, 0));
        this.faces = [f1, f2, f3, f4];
    }
    
    public draw(position: Vector2D, theta: number, visualizer: Visualizer, color: string) : void {
        for(var i = 0; i < this.faces.length; i++) {
            let triangle2D = this.faces[i].project2D();
            let pointsArray = [triangle2D.v1, triangle2D.v2, triangle2D.v3];
            visualizer.draw(position, theta, pointsArray, color);            
        }
    }
}
