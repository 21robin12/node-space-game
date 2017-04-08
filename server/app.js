// Basic requirejs config
var requirejs = require('requirejs');
requirejs.config({
    nodeRequire: require,
    paths: {
        physics: "./public/scripts/physics",
        client: "./public/scripts",
        helpers: "./public/scripts/helpers",
        game: "./public/scripts/game",

    }
});

requirejs(["GameServer", "socket.io", "express", "path"], 
function (GameServer, socketio, express, path) {

    var app = express();
    
    // Set public folder, view folder and view engine
    app.use(express.static(__dirname + '/public'));
    app.set('views', path.join(__dirname, '/views'));
    app.set('view engine', 'vash');
    
    // Start server
    var server = app.listen(1337, function () {
        
        var host = server.address().address;
        var port = server.address().port;
        
        console.log('space game server listening at http://%s:%s', host, port);
    });
    
    // Define game
    var gameWidth = 600;
    var gameHeight = 600;
    var gameServer = new GameServer(gameWidth, gameHeight);
    
    // Start game
    gameServer.start();
    
    // Define sockets
    var io = socketio.listen(server);
    io.sockets.on('connection', function (socket) {
        gameServer.emitter.on("GameServer all-player-data", function(playerData) {
            socket.emit('GameServer all-player-data', playerData);
        });

        gameServer.emitter.on("GameServer key-removed", function(data) {
            socket.emit("GameServer key-removed", data);
        });
        
        gameServer.emitter.on("GameServer key-added", function (data) {
            socket.emit("GameServer key-added", data);
        });

        socket.on('Client im-still-here', function (data) {
            gameServer.onImStillHere(data);
        });

        socket.on('KeyHandler key-removed', function (data) {
            gameServer.onKeyRemoved(data);
        });

        socket.on('KeyHandler key-added', function (data) {
            gameServer.onKeyAdded(data);
        });
    });
    
    // Routing
    app.get("/", function (req, res) {
        var playerName = req.query.playerName;
        if (playerName) {
            var newPlayerId = gameServer.addNewPlayer();
            var host = req.headers.host;
            var model = {
                id: newPlayerId,
                width: gameWidth,
                height: gameHeight,
                domain: host,
                playerName: playerName
            };

            res.render("game", model);
        } else {
            res.redirect("/enter-name");
        }
    });

    app.get("/enter-name", function (req, res) {
        res.render("enterName");
    });
});

