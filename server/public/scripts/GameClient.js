define(["io", "game/KeyHandler", "drawing/Visualizer", "physics/SpaceShip", "game/GameState", "game/PlayerDataConverter", "drawing/PointArrays"], 
function (io, KeyHandler, Visualizer, SpaceShip, GameState, PlayerDataConverter, PointArrays) {

    function Client(id, domain, width, height) {
        this.id = id;
        this.socket = io.connect(domain);
        this.gameState = new GameState(width, height);

        var canvas = document.getElementById('canvas');
        var canvasContext = canvas.getContext('2d');
        this.canvasContext = canvasContext;
        this.visualizer = new Visualizer(canvasContext);
        
        this._initSockets(this.socket);
        this.keyHandler = new KeyHandler(this.id, this.socket);
        this.last = 0;
    }
    
    // *********************X
    // *** PUBLIC METHODS ***
    // *********************X

    Client.prototype.start = function () {
        var self = this;
        this.last = new Date().getTime();
        
        var frameInterval = 1000 / 60;
        var imStillHereInterval = 1000;

        setInterval(function () {
            self._doGameStep();
        }, frameInterval);

        setInterval(function () {
            self.socket.emit('Client im-still-here', self.id);
        }, imStillHereInterval);
    }
    
    // **********************X
    // *** PRIVATE METHODS ***
    // **********************X

    Client.prototype._doGameStep = function () {
        var now = new Date().getTime();
        var dt = now - this.last;
        this.last = now;

        this.gameState.evolve(dt);
        this._drawEverything();
    }
    
    Client.prototype._drawEverything = function () {
        this.canvasContext.clearRect(0, 0, canvas.width, canvas.height);

        var currentPlayer = null;
        for (var i = 0; i < this.gameState.players.length; i++) {
            var player = this.gameState.players[i];
            if (player.playerId === this.id) {
                currentPlayer = player;
            } else {
                this._drawPlayer(player, "#FF0000");
            }
        }

        if (currentPlayer !== null) {
            this._drawPlayer(currentPlayer, "#00FFFF");
        }
    }
    
    Client.prototype._initSockets = function (socket) {
        var self = this;
        socket.on('GameServer all-player-data', function (playerData) {
            self.gameState.players = PlayerDataConverter.dataToPlayers(playerData);
        });
        
        socket.on("GameServer key-added", function (data) {
            self.gameState.addKeyToPlayer(data.key, data.id);
        });
        
        socket.on("GameServer key-removed", function (data) {
            self.gameState.removeKeyFromPlayer(data.key, data.id);
        });
    }
    Client.prototype._drawPlayer = function (player, color) {
        var spaceShip = player.spaceShip;
        this.visualizer.draw(spaceShip.position, spaceShip.theta, PointArrays.spaceShip, color);
        this.visualizer.drawText(player.playerName, { x: spaceShip.position.x - 20, y: spaceShip.position.y - 24 }, color);
    }

    return Client;
});