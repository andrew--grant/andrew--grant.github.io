var CollectManager = function (playerDisc, game) {
    this.game = game;
    this.playerDisc = playerDisc;
    this.waitTime = 3000;
    this.lastSpawnPos = [0, 0];
    this.collect = null;
    this.gridSpawnLocations = null;
};

CollectManager.prototype.getRandomPosition = function () {
    var centerx = this.game.width / 2;
    var centery = this.game.height / 2;
    this.gridSpawnLocations =
        [
            [centerx - Main.Config.moveDistance, centery - Main.Config.moveDistance],
            [centerx, centery - Main.Config.moveDistance],
            [centerx + Main.Config.moveDistance, centery - Main.Config.moveDistance],
            [centerx - Main.Config.moveDistance, centery],
            [centerx, centery],
            [centerx + Main.Config.moveDistance, centery],
            [centerx - Main.Config.moveDistance, centery + Main.Config.moveDistance],
            [centerx, centery + Main.Config.moveDistance],
            [centerx + Main.Config.moveDistance, centery + Main.Config.moveDistance]
        ];
    return Main.Config.collectSpawnLocations[this.game.rnd.integerInRange(0, 8)]
};

CollectManager.prototype.showCollect = function () {
    // get a random position in the grid
    var pos = null;
    if (this.playerDisc.score.getScore() == 0) {
        pos = [771, 1104];
    } else {
        pos = this.getRandomPosition();
    }
    for (var i = 0; i < 100; i++) {
        if (pos[0] == this.lastSpawnPos[0] || pos[1] == this.lastSpawnPos[1]) {
            // It may take a few tries, but we need to make sure
            // not to respawn in the same position as last time
            pos = this.getRandomPosition();
        }
        else {
            // called with true for nimble collect
            var currentScore = this.playerDisc.score.getScore();
            if (currentScore > 0 && (currentScore % 11 == 0)) {
                this.collect = new Collect(pos[0], pos[1], this, true);
            } else {
                this.collect = new Collect(pos[0], pos[1], this, false);
            }
            this.lastSpawnPos = pos;
            break;
        }
    }
    this.lastSpawnPos = pos;
};

CollectManager.prototype.stop = function () {
    this.collect.stop();
};