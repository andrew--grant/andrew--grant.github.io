var DiscManager = function (playerDisc, game) {
    this.game = game;
    this.playerDisc = playerDisc
    this.discGroup = this.game.add.group();
    this.trailManager = new TrailManager(game);
    this.discSpeed = 400;
};

DiscManager.prototype.getFromGroup = function () {
    var disc = this.discGroup.getFirstExists(false);
    if (disc === null) {
        disc = new Disc(this.game, -100, -100, this.trailManager, this.playerDisc);
        this.discGroup.add(disc);
        return disc;
    }
    return disc;
};

DiscManager.prototype.increaseSpeedBy = function (speed) {
    this.speed = speed;
};

DiscManager.prototype.stop = function (speed) {
    this.discGroup.setAll("body.velocity.x", 0);
    this.discGroup.setAll("body.velocity.y", 0);
};