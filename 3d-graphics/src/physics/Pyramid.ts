class Pyramid {
    public faces: Triangle3D[];
    
    constructor(sf: number) {
        let nd = (sf / 3) * 1.01;
        let f1 = new Triangle3D(new Vector3D(-sf, 0, 0), new Vector3D(0, sf, 0), new Vector3D(0, 0, sf), new Vector3D(-nd, nd, nd));
        let f2 = new Triangle3D(new Vector3D(0, 0, sf), new Vector3D(0, sf, 0), new Vector3D(sf, 0, 0), new Vector3D(nd, nd, nd));
        let f3 = new Triangle3D(new Vector3D(0, 0, sf), new Vector3D(sf, 0, 0), new Vector3D(0, -sf, 0), new Vector3D(nd, -nd, nd));
        let f4 = new Triangle3D(new Vector3D(-sf, 0, 0), new Vector3D(0, 0, sf), new Vector3D(0, -sf, 0), new Vector3D(-nd, -nd, nd));
        this.faces = [f1, f2, f3, f4];
    }
    
    public draw(position: Vector2D, theta: number, visualizer: Visualizer, lightSource: LightSource) : void {
        for(var i = 0; i < this.faces.length; i++) {
            let triangle2D = this.faces[i].project2D();
            let pointsArray = [triangle2D.v1, triangle2D.v2, triangle2D.v3];
            
            var lf = lightSource.getLightFactor(this.faces[i]);
            var color = lf == 1 ? "#00FFFF" : "#006C6C";
            
            visualizer.draw(position, theta, pointsArray, color);            
        }
    }
} 
 
