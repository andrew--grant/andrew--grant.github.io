var Main = {}

Main.Boot = function (game) {
    this.game = game;
};

Main.Boot.prototype = {
    preload: function () {
        Main.Config = Configuration(this.game, 150);
        Main.hammer = new Hammer(this.game.canvas);
    },

    create: function () {   var bgGradient = new BackgroundGradient(this.game, "#0054a6", "#66ccff");
        bgGradient.add();
        // Unless you specifically know your game needs
        // to support multi-touch I would recommend setting this to 1
        this.game.input.maxPointers = 1;
        // Phaser will automatically pause if the browser tab the
        // game is in loses focus. You can disable that here:
        this.game.stage.disableVisibilityChange = true;
        this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.game.stage.backgroundColor = Main.Config.backgroundColor;
        if (this.game.device.desktop) {
            // If you have any desktop specific
            // settings, they can go in here
            this.scale.pageAlignHorizontally = false;
        }
        else {
            // Mobile settings
            this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.scale.forceLandscape = true;
            //this.scale.pageAlignHorizontally = true;
        }
        this.scale.setScreenSize(true);
        this.state.start('preloader');
    }
};