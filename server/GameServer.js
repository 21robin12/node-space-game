define(["physics/SpaceShip", "events", "game/GameState", "helpers/ArrayHelper", "game/PlayerDataConverter", "ServerPlayer"], 
function (SpaceShip, events, GameState, ArrayHelper, PlayerDataConverter, ServerPlayer) {

    function GameServer(width, height) {        
        this.players = [];
        this.emitter = new events.EventEmitter();
        this.gameState = new GameState(width, height);
        this.last = 0;
    }
    
    // *********************X
    // *** PUBLIC METHODS ***
    // *********************X

    GameServer.prototype.start = function() {
        var self = this;
        this.last = new Date().getTime();
        
        // 1000 / 60 -> 60fps
        var gameStepInterval = 1000 / 60;
        var kickAbsentInterval = 5000;
        var broadcastPositionsInterval = 1000;

        setInterval(function () {
            self._kickAbsentPlayers(kickAbsentInterval);
        }, kickAbsentInterval);

        setInterval(function () {
            self._doGameStep();
        }, gameStepInterval);

        setInterval(function() {
            self._broadcastPositions();
        }, broadcastPositionsInterval);
    }
    
    GameServer.prototype.addNewPlayer = function () {
        var newPlayerId = this._getNextId();
        this.players.push(new ServerPlayer({ playerId: newPlayerId }));
        this.gameState.addNewPlayer(newPlayerId);
        
        return newPlayerId;
    }
    
    GameServer.prototype.onImStillHere = function (data) {
        var player = ArrayHelper.getItemByValue(this.players, "playerId", data);
        if (player) {
            player.lastUp = new Date().getTime();
        }   
    }

    GameServer.prototype.onKeyRemoved = function (data) {
        this.gameState.removeKeyFromPlayer(data.key, data.id);
        this.emitter.emit("GameServer key-removed", data);
    }
    
    GameServer.prototype.onKeyAdded = function (data) {
        this.gameState.addKeyToPlayer(data.key, data.id);
        this.emitter.emit("GameServer key-added", data);
    }
    
    // **********************X
    // *** PRIVATE METHODS ***
    // **********************X

    GameServer.prototype._kickAbsentPlayers = function (interval) {
        var indexesToKick = [];
        
        for (var i = 0; i < this.players.length; i++) {
            var timeSinceLastUp = new Date().getTime() - this.players[i].lastUp;
            if (timeSinceLastUp > interval) {
                indexesToKick.push(i);
            }
        }
        
        for (var j = indexesToKick.length - 1; j > -1; j--) {
            // TODO only store players in one place...
            this.players.splice(indexesToKick[j], 1);
            this.gameState.players.splice(indexesToKick[j], 1);
        }
        
        var ids = ArrayHelper.getValues(this.players, "playerId");
        console.log("current player ids: " + ids.join(", "));
    }
    
    GameServer.prototype._doGameStep = function () {
        var now = new Date().getTime();
        var dt = now - this.last;
        this.last = now;
        
        this.gameState.evolve(dt);
    }
    
    GameServer.prototype._getNextId = function () {
        var nextId = 0;
        var ids = ArrayHelper.getValues(this.players, "playerId");
        for (var i = 0; i < ids.length; i++) {
            if (ids.indexOf(i + 1) < 0) {
                nextId = i + 1;
            }
        }
        
        return nextId;
    }
    
    GameServer.prototype._broadcastPositions = function () {
        var playerData = PlayerDataConverter.playersToData(this.gameState.players);
        this.emitter.emit("GameServer all-player-data", playerData);
    }
    
    return GameServer;
});



