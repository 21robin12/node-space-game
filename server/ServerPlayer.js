define([], function () {
    function ServerPlayer(settings) {
        this.playerId = settings.playerId;
        this.lastUp = new Date().getTime();
    }

    return ServerPlayer;
});