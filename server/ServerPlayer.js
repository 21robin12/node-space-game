define([], function () {
    function ServerPlayer(settings) {
        this.playerId = settings.playerId;
        this.playerName = settings.playerName;
        this.lastUp = new Date().getTime();
    }

    return ServerPlayer;
});