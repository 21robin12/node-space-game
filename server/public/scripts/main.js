requirejs.config({
    // NOTE: since both the client and the server use client-side scripts,
    // the same paths should be available to both 
    paths: {
        'io': '//cdn.socket.io/socket.io-1.3.4',
        drawing: "./drawing",
        physics: "./physics",
        helpers: "./helpers",
        game: "./game",
        client: "./"
    }
});

// NOTE: requirejs loads asynchronously, so a function defined here may or may
// not be available when calling an onload function. In fact, calling a 
// function onload is incorrect - the code here should be the entry point for
// the application
require(['GameClient'], function (GameClient) {
    var body = document.getElementsByTagName("body")[0];
    var domain = body.getAttribute("data-domain");
    function getIntValue(attributeName) {
        return parseInt(body.getAttribute(attributeName));
    }

    var id = getIntValue("data-id");
    var width = getIntValue("data-width");
    var height = getIntValue("data-height");
    var playerName = body.getAttribute("data-player-name");

    var gameClient = new GameClient(id, domain, width, height, playerName);
    gameClient.start();
});
