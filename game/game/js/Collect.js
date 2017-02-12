'use strict';

var Collect = function (x, y, collectManager, isNimble) {
    if (!isNimble) {
        Phaser.Sprite.call(this, collectManager.game, x, y, Main.Config.sprites.collect.key, 0);
    } else {
        Phaser.Sprite.call(this, collectManager.game, x, y, Main.Config.sprites.collectAlt.key, 0);
    }
    this.isNimble = isNimble;
    this.game = collectManager.game;
    this.collectManager = collectManager;
    this.playerDisc = collectManager.playerDisc;
    this.game.physics.arcade.enable(this);
    this.scale.setTo(0);
    this.game.add.existing(this);
    this.anchor.setTo(0.5, 0.5);
    this.animations.add('collectanim', [1, 2, 3, 4],16,false);
    this.collectActions = new CollectActions(this.game);
    this.stopped = false;
};

Collect.prototype = Object.create(Phaser.Sprite.prototype);
Collect.prototype.constructor = Collect;

Collect.prototype.update = function () {
    var self = this;
    if (!this.stopped) {
        this.angle += 2;
        if (this.scale.x < 1) {
            this.scale.setTo(this.scale.x + .2, this.scale.y + .2);
        }
        this.game.physics.arcade.overlap(this, this.playerDisc, function () {
            self.collectActions.showPointsAndAnimate(1, self, self.collectManager, function () {
                self.playerDisc.score.updateScore(1);
                if (self.isNimble && !self.playerDisc.currentlyNimble) {
                    self.playerDisc.goNimble();
                }
            });
        });
    }
};

Collect.prototype.stop = function () {
    this.stopped = true;
    this.collectActions.stop();
};

