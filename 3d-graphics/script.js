function init() {
    var canvas = document.getElementById('canvas');
    var canvasContext = canvas.getContext('2d');
    var visualizer = new Visualizer(canvasContext);

    var ship = [new Vector2D(0, -20), new Vector2D(10, 10), new Vector2D(0, 5), new Vector2D(-10, 10)];
    visualizer.draw({x: 300, y: 300}, 0, ship, "#00FFFF");
    
    var pyramid = new Pyramid(36);
    pyramid.draw({x: 450, y: 450}, 0, visualizer, "#00FFFF");
}
