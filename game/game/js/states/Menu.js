Main.Menu = function (game) {
    this.game = game;
};

// cordova create thedodgegame au.net.andrewgrant "thedodgegame"

Main.Menu.prototype = {

    create: function () {
        var bgGradient = new BackgroundGradient(this.game, "#0054a6", "#66ccff");
        bgGradient.add();
        this.text = this.game.add.text(game.world.centerX, game.world.centerY, "Start Game", {
            font: "120px " + Main.Config.fontFace,
            fill: Main.Config.fontColor,
            align: "center"
        });
        this.text.anchor.setTo(0.5);
        this.text.inputEnabled = true;
        this.text.events.onInputDown.add(function () {
            this.state.start('game');
        }, this);
    }
};