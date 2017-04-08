define([], function () {
    function Player(settings) {
        this.playerId = settings.playerId;
        this.spaceShip = settings.spaceShip;
        this.pressedKeys = [];
    }

    return Player;
});