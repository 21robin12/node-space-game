define(function() {
    function KeyHandler(clientId, socket) {
        
        this.socket = socket;
        this.clientId = clientId;

        // 37 = left, 38 = up, 39 = right
        // only keys listed here will be reported to server
        this.relevantKeyCodes = [37, 38, 39];
        this.pressedKeyCodes = [];

        // hook events
        var self = this;
        document.onkeydown = function(e) {
            self._onKeyDown(e, self);
        }
        
        document.onkeyup = function (e) {
            self._onKeyUp(e, self);
        }

        self._registerElementAsKey("button-left", 37);
        self._registerElementAsKey("button-forwards", 38);
        self._registerElementAsKey("button-right", 39);
    }
    
    // **********************X
    // *** PRIVATE METHODS ***
    // **********************X
    
    KeyHandler.prototype._onKeyDown = function (e, self) {
        e = e || window.event;
        if (self.relevantKeyCodes.indexOf(e.keyCode) > -1) {
            self._addKey(e.keyCode, self.pressedKeyCodes);
        }
    };
    
    KeyHandler.prototype._onKeyUp = function (e, self) {
        e = e || window.event;
        if (self.relevantKeyCodes.indexOf(e.keyCode) > -1) {
            self._removeKey(e.keyCode, self.pressedKeyCodes);
        }
    };
    
    KeyHandler.prototype._addKey = function (value, array) {
        var index = array.indexOf(value);
        if (index < 0) {
            array.push(value);
            this._emitKeyAdded(value);
        }
    }
    
    KeyHandler.prototype._removeKey = function (value, array) {
        var index = array.indexOf(value);
        if (index > -1) {
            array.splice(index, 1);
            this._emitKeyRemoved(value);
        }
    }

    KeyHandler.prototype._registerElementAsKey = function (buttonId, keyCode) {
        var self = this;
        document.getElementById(buttonId).addEventListener("touchstart", function () {
            self._addKey(keyCode, self.pressedKeyCodes);
        });

        document.getElementById(buttonId).addEventListener("mousedown", function () {
            self._addKey(keyCode, self.pressedKeyCodes);
        });

        document.getElementById(buttonId).addEventListener("touchend", function () {
            self._removeKey(keyCode, self.pressedKeyCodes);
        });

        document.getElementById(buttonId).addEventListener("mouseup", function () {
            self._removeKey(keyCode, self.pressedKeyCodes);
        });
    }

    KeyHandler.prototype._emitKeyAdded = function (keyCode) {
        var message = { id: this.clientId, key: keyCode };
        this.socket.emit('KeyHandler key-added', message);
    };
    
    KeyHandler.prototype._emitKeyRemoved = function(keyCode) {
        var message = { id: this.clientId, key: keyCode };
        this.socket.emit('KeyHandler key-removed', message);
    }

    return KeyHandler;
});