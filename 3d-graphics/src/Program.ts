class Program {
    run(canvasContext : any) : void {
        var visualizer = new Visualizer(canvasContext);

        var ship = [new Vector2D(0, -20), new Vector2D(10, 10), new Vector2D(0, 5), new Vector2D(-10, 10)];
        visualizer.draw({x: 300, y: 300}, 0, ship, "#00FFFF");

        var lightSource = new LightSource(new Vector3D(0, 0, 12));

        var pyramid = new Pyramid(36, new Vector3D(452, 452, 0));
        pyramid.draw(0.9, visualizer, lightSource);

        visualizer.drawCircle(lightSource.position, 20, "IMPLEMENT THIS");
    }
}
