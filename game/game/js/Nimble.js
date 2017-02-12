'use strict';

var Nimble = function (game, playerDisc) {
    this.playerDisc = playerDisc;
    this.game = game;
    this.timer = null;
    this.messageScreen = null;
};

Nimble.prototype.constructor = Nimble;

Nimble.prototype.startNimble = function (seconds) {
    this.playerDisc.scaleForNimble();
    this.playerDisc.swooshSound = Main.swooshNimble;
    var cnt = seconds;
    var msg = "ride like the wind!\n";
    this.messageScreen = new MessageScreen(this.game, 0x0054a6, 0, 1500, this.game.width, 400, 110, 90, 90);
    this.messageScreen.addTextContent(msg + cnt--, null);
    var myLoop = this.game.time.events.loop(1000, function () {
        if (cnt != seconds) {
            this.messageScreen.updateTextContent(msg + cnt--);
        }
        if (cnt == -1) {
            this.endNimble();
            this.playerDisc.currentlyNimble = false;
            this.game.time.events.remove(myLoop);
        }
    }, this);
};

Nimble.prototype.endNimble = function () {
    this.playerDisc.scaleForNormal();
    this.playerDisc.swooshSound = Main.swoosh;
    this.messageScreen.removeOverlay();
};