'use strict';

var PlayerDisc = function (x, y, game, score) {
    Phaser.Sprite.call(this, game, x, y, Main.Config.sprites.playerDisc.key);
    this.game = game;
    this.game.physics.arcade.enable(this);
    this.score = score;
    this.game.add.existing(this);
    this.isNimble = false;
    this.currentlyNimble = false;
    this.isCurrentlyMoving = false;
    this.anchor.setTo(0.5, 0.5);
    this.scaleDefault = .55;
    this.scaleNimble = .25;
    this.scale.set(this.scaleDefault, this.scaleDefault);
    this.inputDisabled = false;
    this.leftMostMove = Main.Config.collectSpawnLocations[0][0];
    this.rightMostMove = Main.Config.collectSpawnLocations[5][0];
    this.topMostMove = Main.Config.collectSpawnLocations[0][1];
    this.bottomMostMove = Main.Config.collectSpawnLocations[7][1];
    this.stopped = false;
    this.moveTween = null;
    this.swooshSound = Main.swoosh;
    this.tweenSpeedDefault = 200;
    this.tweenSpeedNimble = 50;
    this.tweenSpeed = this.tweenSpeedDefault;
    var self = this;
    this.game.input.keyboard.onDownCallback = function (e) {
        self.move(e, self);
    };
    Main.hammer.get('pan').set({direction: Hammer.DIRECTION_ALL});
    Main.hammer.on("panstart", function (evt) {
        self.panned(evt.direction, self);
    });
};

PlayerDisc.prototype = Object.create(Phaser.Sprite.prototype);
PlayerDisc.prototype.constructor = PlayerDisc;

PlayerDisc.prototype.explode = function (doExplode) {
    doExplode();
};

PlayerDisc.prototype.scaleForNimble = function () {
    this.nimbleTween = this.game.add.tween(this.scale);
    this.nimbleTween.to({
        x: this.scaleNimble,
        y: this.scaleNimble
    });
    this.nimbleTween.easing(Phaser.Easing.Back.Out);
    this.nimbleTween.start();
    this.tweenSpeed = this.tweenSpeedNimble;
};

PlayerDisc.prototype.scaleForNormal = function () {
    // guard for 'Cannot read property 'add' of null'
    if (this.game != null) {
        this.nimbleTween = this.game.add.tween(this.scale);
        this.nimbleTween.to({
            x: this.scaleDefault,
            y: this.scaleDefault
        });
        this.nimbleTween.easing(Phaser.Easing.Back.Out);
        this.nimbleTween.start();
        this.tweenSpeed = this.tweenSpeedDefault;
    }
};

PlayerDisc.prototype.stop = function () {
    this.stopped = true;
    if (this.moveTween != null) {
        this.moveTween.stop();
    }
};

PlayerDisc.prototype.goNimble = function () {
    var nimble = new Nimble(this.game, this);
    nimble.startNimble(15);
    this.currentlyNimble = true;
};

PlayerDisc.prototype.isSafe = function () {
    return this.game.width / 2 == this.x && this.game.height / 2 == this.y;
};

PlayerDisc.prototype.doTween = function (spriteRef, tweenProps) {
    var self = this;
    if (!self.isCurrentlyMoving) {
        self.swooshSound.play();
    }
    this.isCurrentlyMoving = true;
    if (!self.inputDisabled) {
        self.inputDisabled = true;
        self.moveTween = this.game.add.tween(spriteRef);
        self.moveTween.to(tweenProps, this.tweenSpeed).onComplete.add(function () {
            self.inputDisabled = false;
            self.isCurrentlyMoving = false;
        });
        self.moveTween.easing(Phaser.Easing.Back.Out);
        self.moveTween.start();
    }
};

PlayerDisc.prototype.panned = function (direction, spriteRef) {
    // left 2, right 4, up 8, down 16
    if (!this.stopped) {
        switch (direction) {
            case 2:
                if (!(spriteRef.x == this.leftMostMove)) {
                    this.doTween(spriteRef, {x: spriteRef.x - Main.Config.moveDistance});
                }
                break;
            case 4 :
                if (!(spriteRef.x == this.rightMostMove)) {
                    this.doTween(spriteRef, {x: spriteRef.x + Main.Config.moveDistance});
                }
                break;
            case 8:
                if (!(spriteRef.y == this.topMostMove)) {
                    this.doTween(spriteRef, {y: spriteRef.y - Main.Config.moveDistance});
                }
                break;
            case 16 :
                if (!(spriteRef.y == this.bottomMostMove)) {
                    this.doTween(spriteRef, {y: spriteRef.y + Main.Config.moveDistance});
                }
                break;
        }
    }
};

PlayerDisc.prototype.move = function (key, spriteRef) {
    if (!this.stopped) {
        switch (key.keyCode) {
            case Phaser.Keyboard.LEFT:
                if (!(spriteRef.x == this.leftMostMove)) {
                    this.doTween(spriteRef, {x: spriteRef.x - Main.Config.moveDistance});
                }
                break;
            case Phaser.Keyboard.RIGHT :
                if (!(spriteRef.x == this.rightMostMove)) {
                    this.doTween(spriteRef, {x: spriteRef.x + Main.Config.moveDistance});
                }
                break;
            case Phaser.Keyboard.UP:
                if (!(spriteRef.y == this.topMostMove)) {
                    this.doTween(spriteRef, {y: spriteRef.y - Main.Config.moveDistance});
                }
                break;
            case Phaser.Keyboard.DOWN :
                if (!(spriteRef.y == this.bottomMostMove)) {
                    this.doTween(spriteRef, {y: spriteRef.y + Main.Config.moveDistance});
                }
                break;
        }
    }
};