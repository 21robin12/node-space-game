define(["physics/SpaceShip", "helpers/ArrayHelper"], function (SpaceShip, ArrayHelper) {
    function GameState(width, height) {
        
        // record playerId, pressedKeys and spaceShip
        this.players = [];
        this.width = width;
        this.height = height;
    }
    
    // *********************X
    // *** PUBLIC METHODS ***
    // *********************X

    GameState.prototype.evolve = function (dt) {
        for (var i = 0; i < this.players.length; i++) {
            var ship = this.players[i].spaceShip;

            ship.move(dt, this.width, this.height);
            ship.applyDrag(dt);
            
            var actions = [
                { key: 37, action: function () { ship.rotateAnticlockwise(dt); } },
                { key: 38, action: function () { ship.accelerate(dt); } },
                { key: 39, action: function () { ship.rotateClockwise(dt); } }
            ];
            
            for (var j = 0; j < actions.length; j++) {
                if (this.players[i].pressedKeys.indexOf(actions[j].key) > -1) {
                    actions[j].action();
                }
            }
        }
    }
    
    GameState.prototype.addNewPlayer = function (newPlayerId) {
        var ship = new SpaceShip(this.width / 2, this.height / 2);
        this.players.push({ playerId: newPlayerId, pressedKeys: [], spaceShip: ship });
    }

    GameState.prototype.addKeyToPlayer = function(key, playerId) {
        var player = ArrayHelper.getItemByValue(this.players, "playerId", playerId);
        ArrayHelper.add(key, player.pressedKeys);
    }
    
    GameState.prototype.removeKeyFromPlayer = function (key, playerId) {
        var player = ArrayHelper.getItemByValue(this.players, "playerId", playerId);
        ArrayHelper.remove(key, player.pressedKeys);
    }
    
    return GameState;
});