'use strict';

var DiscLoop = function (game, discManager, score) {
    this.loopDuration = 2000;
    this.speed = 650;
    this.speedIncrease = 40;
    this.greaterThan = 5;
    this.game = game;
    this.discManager = discManager;
    this.score = score;
    this.difficultyLevel = 1;
    this.spawnDelay = 1000;
    this.lastScoreLoggedInLoop = 0;
    this.discLoop = null;

    // general positions to base lanes upon
    var centerLaneTop = {x: this.game.width / 2, y: 0},
        centerLaneBottom = {x: this.game.width / 2, y: this.game.height},
        centerLaneLeft = {x: 0, y: this.game.height / 2},
        centerLaneRight = {x: this.game.width, y: this.game.width};

    // When its time to spawn we need to know where
    // to spawn from and what direction to travel in
    this.lanes = [
        // 3 lanes spawning from the left
        {
            spawnx: centerLaneLeft.x,
            spawny: centerLaneLeft.y - Main.Config.moveDistance,
            velocity: {x: this.speed, y: 0, applySpeedTo: 'x', negative: false}
        },
        {
            spawnx: centerLaneLeft.x,
            spawny: centerLaneLeft.y,
            velocity: {applySpeedTo: 'x', negative: false}
        },
        {
            spawnx: centerLaneLeft.x,
            spawny: centerLaneLeft.y + Main.Config.moveDistance,
            velocity: {applySpeedTo: 'x', negative: false}
        },
        // 3 lanes spawning from the right
        {
            spawnx: centerLaneRight.x,
            spawny: centerLaneLeft.y - Main.Config.moveDistance,
            velocity: {applySpeedTo: 'x', negative: true}
        },
        {
            spawnx: centerLaneRight.x,
            spawny: centerLaneLeft.y,
            velocity: {applySpeedTo: 'x', negative: true}
        },
        {
            spawnx: centerLaneRight.x,
            spawny: centerLaneLeft.y + Main.Config.moveDistance,
            velocity: {applySpeedTo: 'x', negative: true}
        },
        // 3 lanes spawning from the top
        {
            spawnx: centerLaneTop.x + Main.Config.moveDistance,
            spawny: centerLaneTop.y,
            velocity: {applySpeedTo: 'y', negative: false}
        },
        {
            spawnx: centerLaneTop.x,
            spawny: centerLaneTop.y,
            velocity: {applySpeedTo: 'y', negative: false}
        },
        {
            spawnx: centerLaneTop.x - Main.Config.moveDistance,
            spawny: centerLaneTop.y,
            velocity: {applySpeedTo: 'y', negative: false}
        },
        // 3 lanes spawning from the bottom
        {
            spawnx: centerLaneBottom.x + Main.Config.moveDistance,
            spawny: centerLaneBottom.y,
            velocity: {applySpeedTo: 'y', negative: true}
        },
        {
            spawnx: centerLaneBottom.x,
            spawny: centerLaneBottom.y,
            velocity: {applySpeedTo: 'y', negative: true}
        },
        {
            spawnx: centerLaneBottom.x - Main.Config.moveDistance,
            spawny: centerLaneBottom.y,
            velocity: {applySpeedTo: 'y', negative: true}
        },
    ];
};

DiscLoop.prototype.stop = function () {
    this.game.time.events.remove(this.discLoop);
};
DiscLoop.prototype.start = function () {
    this.discLoop = this.game.time.events.loop(this.loopDuration, function () {
        // Difficulty:
        // Decrease greater than odds
        // increase speed (gradually over the 3 disc spawn points)
        // increase loop duration
        // decrease spawn delays
        // send random fast discs
        var score = this.score.getScore();
        if (score % 10 === 0 && score > 0) {
            if (this.lastScoreLoggedInLoop !== score) {
                this.speed += this.speedIncrease;
                if (this.greaterThan > 0) {
                    this.greaterThan -= 1;
                    this.spawnDelay -= 10;
                    this.difficultyLevel += 1;
                }
                this.lastScoreLoggedInLoop = score;
            }
        }

        var randomLane = this.game.rnd.integerInRange(0, 11);
        var disc = this.discManager.getFromGroup();
        disc.exists = true;
        if (this.lanes[randomLane].velocity.applySpeedTo == "x") {
            this.lanes[randomLane].velocity.negative == true ?
                disc.body.velocity.x = -this.speed : disc.body.velocity.x = this.speed;
            disc.body.velocity.y = 0;
        } else {
            this.lanes[randomLane].velocity.negative == true ?
                disc.body.velocity.y = -this.speed : disc.body.velocity.y = this.speed;
            disc.body.velocity.x = 0;
        }
        disc.x = this.lanes[randomLane].spawnx;
        disc.y = this.lanes[randomLane].spawny;


        var timer = game.time.events.add(this.spawnDelay, function () {
            var rand2 = this.game.rnd.integerInRange(0, 10) >= this.greaterThan;
            if (rand2) {
                randomLane = this.game.rnd.integerInRange(0, 11);
                var disc2 = this.discManager.getFromGroup();
                disc2.exists = true;
                if (this.lanes[randomLane].velocity.applySpeedTo == "x") {
                    this.lanes[randomLane].velocity.negative == true ?
                        disc2.body.velocity.x = -this.speed : disc2.body.velocity.x = this.speed;
                    disc2.body.velocity.y = 0;
                } else {
                    this.lanes[randomLane].velocity.negative == true ?
                        disc2.body.velocity.y = -this.speed : disc2.body.velocity.y = this.speed;
                    disc2.body.velocity.x = 0;
                }
                disc2.x = this.lanes[randomLane].spawnx;
                disc2.y = this.lanes[randomLane].spawny;
            }
        }, this);

        var timer = game.time.events.add(this.spawnDelay + 250, function () {
            var rand3 = this.game.rnd.integerInRange(0, 10) >= this.greaterThan;
            if (rand3 && this.difficultyLevel > 3) {
                randomLane = this.game.rnd.integerInRange(0, 11);
                var disc3 = this.discManager.getFromGroup();
                disc3.exists = true;
                if (this.lanes[randomLane].velocity.applySpeedTo == "x") {
                    this.lanes[randomLane].velocity.negative == true ?
                        disc3.body.velocity.x = -this.speed : disc3.body.velocity.x = this.speed;
                    disc3.body.velocity.y = 0;
                } else {
                    this.lanes[randomLane].velocity.negative == true ?
                        disc3.body.velocity.y = -this.speed : disc3.body.velocity.y = this.speed;
                    disc3.body.velocity.x = 0;
                }
                disc3.x = this.lanes[randomLane].spawnx;
                disc3.y = this.lanes[randomLane].spawny;

            }
        }, this);


        var timer = game.time.events.add(this.spawnDelay + 400, function () {
            var rand4 = this.game.rnd.integerInRange(0, 10) >= this.greaterThan;
            if (rand4) {
                randomLane = this.game.rnd.integerInRange(0, 11);
                var disc4 = this.discManager.getFromGroup();
                disc4.exists = true;
                if (this.lanes[randomLane].velocity.applySpeedTo == "x") {
                    this.lanes[randomLane].velocity.negative == true ?
                        disc4.body.velocity.x = -this.speed : disc4.body.velocity.x = this.speed;
                    disc4.body.velocity.y = 0;
                } else {
                    this.lanes[randomLane].velocity.negative == true ?
                        disc4.body.velocity.y = -this.speed : disc4.body.velocity.y = this.speed;
                    disc4.body.velocity.x = 0;
                }
                disc4.x = this.lanes[randomLane].spawnx;
                disc4.y = this.lanes[randomLane].spawny;

            }
        }, this);


    }, this);
};

