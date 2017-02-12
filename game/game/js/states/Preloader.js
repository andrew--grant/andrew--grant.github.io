Main.Preloader = function (game) {
    this.game = game;
};

Main.fontsReady = false;

Main.Preloader.prototype = {
    preload: function () {


    },

    create: function () {
        this.game.load.onLoadStart.add(this.loadStart, this);
        this.game.load.onFileComplete.add(this.fileComplete, this);
        this.game.load.onLoadComplete.add(this.loadComplete, this);
        this.start();
    },

    start: function () {
        // audio
        this.game.load.audio('swoosh', ['game/assets/audio/swoosh.ogg','game/assets/audio/swoosh.m4a']);
        this.game.load.audio('swoosh-nimble', ['game/assets/audio/swoosh-nimble.ogg','game/assets/audio/swoosh-nimble.m4a']);
        this.game.load.audio('explosion', ['game/assets/audio/explosion.ogg','game/assets/audio/explosion.m4a']);
        this.game.load.audio('collect', ['game/assets/audio/collect1.ogg','game/assets/audio/collect1.m4a']);
        Main.swoosh = this.game.add.audio('swoosh');
        Main.swooshNimble = this.game.add.audio('swoosh-nimble');
        Main.explosion = this.game.add.audio('explosion');
        Main.collect = this.game.add.audio('collect');
        // sprites
        this.game.load.spritesheet(Main.Config.sprites.pauseButton.key, Main.Config.sprites.pauseButton.path, 120, 135);
        this.game.load.image(Main.Config.sprites.playerDisc.key, Main.Config.sprites.playerDisc.path);
        this.game.load.image(Main.Config.sprites.disc.key, Main.Config.sprites.disc.path);
        this.game.load.image(Main.Config.sprites.grid.key, Main.Config.sprites.grid.path);
        this.game.load.image(Main.Config.sprites.trail.key, Main.Config.sprites.trail.path);
        this.game.load.image(Main.Config.sprites.emitBlack.key, Main.Config.sprites.emitBlack.path);
        this.game.load.image(Main.Config.sprites.emitWhite.key, Main.Config.sprites.emitWhite.path);
        this.game.load.spritesheet(Main.Config.sprites.collect.key, Main.Config.sprites.collect.path, 120, 120);
        this.game.load.spritesheet(Main.Config.sprites.collectAlt.key, Main.Config.sprites.collectAlt.path, 120, 120);
        this.game.load.spritesheet(Main.Config.sprites.crash.key, Main.Config.sprites.crash.path, 360, 360);
        this.game.load.script('webfont', 'lib/webfontloader.js');
        WebFontConfig = {
            custom: {
                families: ['Revalia'],
                urls: ['game/assets/fonts.css']
            },
            active: function () {
                Main.fontsReady = true;
            }
        };
        this.game.load.start();
    },

    loadStart: function () {
    },

    fileComplete: function (progress, cacheKey, success, totalLoaded, totalFiles) {
    },

    loadComplete: function () {
        // wait for for fonts to be active
        // (the loader loads the script only)
        game.time.events.loop(500, function () {
            if (Main.fontsReady) {
                this.state.start('menu');
            }
        }, this);


    }
};

var device = {
    // Application Constructor
    initialize: function () {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function () {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function () {
        device.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function (id) {
    },
    //save high score to local storage
    setHighScore: function (score) {
        var currentHighScore = this.getHighScore();
        if (score > currentHighScore) {
            window.localStorage.setItem("highScore", score);
        }
    },
    //
    //get high score from local storage
    getHighScore: function () {
        return parseInt(window.localStorage.getItem("highScore")) || 0;
    }
};
device.initialize();

Main.device = device;
