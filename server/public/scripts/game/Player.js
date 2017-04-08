define([], function () {
    function Player(settings) {
        this.playerId = settings.playerId;
        this.playerName = "test-name-here";
        this.spaceShip = settings.spaceShip;
        this.pressedKeys = [];
    }

    return Player;
});