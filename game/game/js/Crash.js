'use strict';

var Crash = function (game, disc, playerDisc) {
    this.game = game;
    this.playerDisc = playerDisc;
    this.disc = disc;
};

Crash.prototype.show = function () {
    var numFragments = 25;
    var gravity = 0;//250;
    var timeToLive = 99000;
    var posOffScreen = -100
    var tweenDuration = 6000;//150;
    var scaleFactor = .6;
    var easing = "Linear";
    this.playerDisc.stop();
    var self = this;
    this.playerDisc.explode(function () {
        Main.explosion.play();
        Main.swoosh.stop();
        var crash1 = self.game.add.sprite(self.playerDisc.x, self.playerDisc.y, Main.Config.sprites.crash.key);
        crash1.animations.add('anim', [0, 1, 2, 3, 4], false);
        crash1.animations.play('anim', 50, null, true);
        crash1.anchor.setTo(0.5, 0.5);
        var t1 = self.game.add.tween(self.playerDisc);
        t1.to({alpha: 0}, 40, easing, false);
        t1.start();
        var t2 = self.game.add.tween(self.playerDisc.scale);
        t2.to({
            x: scaleFactor,
            y: scaleFactor
        }, tweenDuration, easing, false);
        t2.start();
        t2.onComplete.add(function () {
            self.playerDisc.destroy();
        });
        var playerDiscEmitter = self.game.add.emitter(self.playerDisc.x, self.playerDisc.y, numFragments);
        playerDiscEmitter.makeParticles(Main.Config.sprites.emitWhite.key);
        playerDiscEmitter.gravity = gravity;
        playerDiscEmitter.start(true, timeToLive, null, numFragments);
    });
    // Game Over
    var timer = self.game.time.events.add(3000, function () {
        var messageScreen = new MessageScreen(self.game, 0x0054a6, 0, 1500, self.game.width, 400, 130, 90, 150);
        messageScreen.addTextContent("Try Again!",
            null,
            function () {
                self.game.state.start('game');
            }
        );
        Main.device.setHighScore(self.playerDisc.score.getScore());
    }, self);
};