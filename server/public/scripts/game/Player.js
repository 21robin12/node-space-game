define([], function () {
    function Player(settings) {
        this.playerId = settings.playerId;
        this.playerName = settings.playerName.substring(0, 10);
        this.spaceShip = settings.spaceShip;
        this.pressedKeys = [];
    }

    return Player;
});