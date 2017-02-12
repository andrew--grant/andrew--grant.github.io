'use strict';

var Trail = function (game, x, y) {
    Phaser.Sprite.call(this, game, x, y, Main.Config.sprites.trail.key);
    this.game = game;
    this.anchor.setTo(0.5, 0.5);
};

Trail.prototype = Object.create(Phaser.Sprite.prototype);
Trail.prototype.constructor = Trail;

Trail.prototype.update = function () {
};
