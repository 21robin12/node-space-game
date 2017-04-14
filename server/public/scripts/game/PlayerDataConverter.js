define(["physics/SpaceShip", "game/Player"], function (SpaceShip, Player) {
    function PlayerDataConverter () { }
    
    // http://stackoverflow.com/questions/17466714/node-socket-io-object-trouble
    // objects are sent via sockets as JSON - and JSON doesn't support functions as values
    // hence, data should be submitted through sockets.io, not the objects themselves
    
    PlayerDataConverter.playersToData = function (players) {
        var playerData = [];
        for (var i = 0; i < players.length; i++) {
            var player = players[i];
            
            var ship = {
                position: player.spaceShip.position,
                velocity: player.spaceShip.velocity,
                theta: player.spaceShip.theta
            };
            
            var data = {
                playerId: player.playerId,
                playerName: player.playerName,
                pressedKeys: player.pressedKeys,
                spaceShip: ship
            };
            
            playerData.push(data);
        }
        
        return playerData;
    }
    
    PlayerDataConverter.dataToPlayers = function (playerData) {
        var players = [];
        
        for (var i = 0; i < playerData.length; i++) {
            var data = playerData[i];
            
            var ship = new SpaceShip(data.spaceShip.position.x, data.spaceShip.position.y);
            ship.velocity = data.spaceShip.velocity;
            ship.theta = data.spaceShip.theta;
            
            var player = new Player ({
                playerId: data.playerId,
                playerName: data.playerName,
                spaceShip: ship
            });

            player.pressedKeys = data.pressedKeys;

            players.push(player);
        }

        return players;
    }
    
    return PlayerDataConverter;
});