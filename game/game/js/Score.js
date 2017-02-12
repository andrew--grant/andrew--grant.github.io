'use strict';

var Score = function (game) {
    // game score
    var self = this;
    this.game = game;
    this.score = 0;
    this.scoreLabel = "";
    var posx = 50;
    var posy = 50;
    var fontsSizeHigh = "200px ";
    var fontsSizeBest = "70px ";
    this.scoreText = this.game.add.text(posx, posy + 100, this.scoreLabel + this.score,
        {font: fontsSizeHigh + Main.Config.fontFace, fill: Main.Config.fontColor, align: "center"});
    // high score
    this.bestScore = Main.device.getHighScore();
    this.bestScoreLabel = "Best: ";
    this.bestScoreText = this.game.add.text(posx, posy, this.bestScoreLabel + this.bestScore,
        {font: fontsSizeBest + Main.Config.fontFace, fill: Main.Config.fontColor, align: "center"});

    // pause
    var pauseLabel = "||";
    this.pauseText = this.game.add.text(posx + 1000, posy, pauseLabel,
        {font: "120px " + Main.Config.fontFace, fill: Main.Config.fontColor, align: "center"});
    this.pauseText.inputEnabled = true;
    this.pauseText.events.onInputDown.add(function () {
        var messageScreen = new MessageScreen(this.game, 0x0054a6, 0, 1500, game.width, 400, 220, 90, 150);
        messageScreen.addTextContent("PAUSED", function () {
            self.game.paused = true;
        });
        game.input.onDown.add(function (event) {
            if (event.x > posx + 1000 && event.x < posx + 1170 && event.y > posy && event.y < posy + 200) {
                game.paused = false;
                messageScreen.removeOverlay();
            }
        }, self);
    }, self);
};

Score.prototype = Object.create(Phaser.Text.prototype);
Score.prototype.constructor = Score;

Score.prototype.updateScore = function (score) {
    this.score += score;
    this.scoreText.setText(this.scoreLabel + this.score);
    if (this.score > this.bestScore) {
        this.updateHighScore(this.score)
    }
};

Score.prototype.getScore = function () {
    return this.score;
};

Score.prototype.updateHighScore = function (score) {
    this.bestScore = score;
    this.bestScoreText.setText(this.bestScoreLabel + this.bestScore);
};