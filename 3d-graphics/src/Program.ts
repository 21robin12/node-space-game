class Program {
    run(canvasContext : any) : void {
        var visualizer = new Visualizer(canvasContext);

        var ship = [new Vector2D(0, -20), new Vector2D(10, 10), new Vector2D(0, 5), new Vector2D(-10, 10)];
        visualizer.draw({x: 300, y: 300}, 0, ship, "#00FFFF");

        var lightSource = new LightSource(new Vector3D(0, 0, 0));

        var pyramid = new Pyramid(36, new Vector2D(450, 450));
        pyramid.draw(0.5, visualizer, lightSource);

        for(var i = 0; i < pyramid.faces.length; i++) {
            console.log(pyramid.faces[i].getCenter());
            console.log(pyramid.faces[i].normalPoint);
        }
    }
}
