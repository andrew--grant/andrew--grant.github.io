var TrailManager = function (game) {
    this.game = game;
    this.trailGroup = this.game.add.group();
};

TrailManager.prototype.add = function (x, y) {
    var trailSprite = this.getFromGroup();
    trailSprite.x = x;
    trailSprite.y = y;
    trailSprite.exists = true;
    trailSprite.anchor.setTo(0.5, 0.5);
    trailSprite.alpha = .2;
    var tween = this.game.add.tween(trailSprite)
        .to({alpha: 0}, 500, Phaser.Easing.Linear.None, true);
    tween.onComplete.add(function () {
        trailSprite.exists = false;
    }, this);
};

TrailManager.prototype.getFromGroup = function () {
    var trail = this.trailGroup.getFirstExists(false);
    if (trail == null) {
        trail = new Trail(this.game, -100, -100);
        this.trailGroup.add(trail);
        return trail;
    }
    return trail;
};