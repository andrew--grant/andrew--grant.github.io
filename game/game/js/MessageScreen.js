'use strict';


var MessageScreen = function (game, fillColor, x, y, width, height, textx, texty, textSize) {
    this.game = game;
    this.fillColor = fillColor;
    this.gfx = game.add.graphics(0, 0);
    this.overlayGroup = null;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.textx = textx;
    this.texty = texty;
    this.textSize = textSize;
    this.textContent = "";
};


MessageScreen.prototype.addTextContent = function (textContent, onTweenComplete, onTextDown) {
    var self = this;
    this.textContent = textContent;
    this.overlayGroup = this.game.add.group();
    this.gfx.beginFill(this.fillColor);
    this.gfx.drawRect(this.x, this.y, this.width, this.height);
    this.gfx.endFill();
    self.text = self.game.add.text(this.x + self.textx, this.y + self.texty, textContent, {
        font: this.textSize + "px " + Main.Config.fontFace,
        fill: Main.Config.fontColor,
        align: "center"
    });
    this.overlayGroup.add(this.gfx);
    this.overlayGroup.add(self.text);
    this.overlayGroup.alpha = 0;
    var fadeTextIn = self.game.add.tween(this.overlayGroup)
    fadeTextIn.to({alpha:.9}, 150, "Linear", false);
    fadeTextIn.start();
    fadeTextIn.onComplete.add(function () {
        if (onTweenComplete != null) {
            onTweenComplete();
        }
    });
    self.text.inputEnabled = true;
    self.text.events.onInputDown.add(function () {
        if (onTextDown != null) {
            onTextDown();
        }
    }, self);
};

MessageScreen.prototype.updateTextContent = function (textContent) {
    var self = this;
    self.text.setText(textContent);

};

MessageScreen.prototype.getTextContent = function () {
    return this.textContent;
};

MessageScreen.prototype.removeOverlay = function () {
    var self = this;
    var fadeTextOut = game.add.tween(this.overlayGroup)
    fadeTextOut.to({alpha:0}, 150, "Linear", false);
    fadeTextOut.start();
    fadeTextOut.onComplete.add(function () {
        self.overlayGroup.destroy();
    });
}

