'use strict';

var Grid = function (x, y, game) {
    Phaser.Sprite.call(this, game, x, y, Main.Config.sprites.grid.key);
    this.game = game;
    this.anchor.setTo(0.5, 0.5);
};

Grid.prototype = Object.create(Phaser.Sprite.prototype);
Grid.prototype.constructor = Grid;

Grid.prototype.add = function () {
    this.game.add.existing(this);
}