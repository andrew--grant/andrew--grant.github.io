var Configuration = function (game, moveDistance) {
    this.game = game;
    return {
        sprites: {
            playerDisc: {
                key: 'playerDisc',
                path: 'game/assets/player-disc.png'
            },
            disc: {
                key: 'disc',
                path: 'game/assets/disc.png'
            },
            emitBlack: {
                key: 'emitBlack',
                path: 'game/assets/emit-black.png'
            },
            emitWhite: {
                key: 'emitWhite',
                path: 'game/assets/emit-white.png'
            },
            grid: {
                key: 'grid',
                path: 'game/assets/grid.png'
            },
            trail: {
                key: 'trail',
                path: 'game/assets/trail.png'
            },
            collect: {
                key: 'collect',
                path: 'game/assets/collect-spritesheet.png'
            },
            collectAlt: {
                key: 'collectAlt',
                path: 'game/assets/collect-spritesheet-alt.png'
            },
            pauseButton:{
                key: 'pauseButton',
                path: 'game/assets/pause-button.png'
            },
            loadingBar: {
                key: 'loadingBar',
                path: 'game/assets/loading-bar.png'
            },
            loadingBackground: {
                key: 'loadingBackground',
                path: 'game/assets/loading-background.png'
            },
            crash: {
                key: 'crash',
                path: 'game/assets/crash.png'
            }
        },
        backgroundColor: 0xffffff,
        fontColor: "#fff200",
        fontFace: "Revalia",
        moveDistance: moveDistance,
        collectSpawnLocations: [
            [this.game.width / 2 - moveDistance, this.game.height / 2 - moveDistance],
            [this.game.width / 2, this.game.height / 2 - moveDistance],
            [this.game.width / 2 + moveDistance, this.game.height / 2 - moveDistance],
            [this.game.width / 2 - moveDistance, this.game.height / 2],
            [this.game.width / 2, this.game.height / 2],
            [this.game.width / 2 + moveDistance, this.game.height / 2],
            [this.game.width / 2 - moveDistance, this.game.height / 2 + moveDistance],
            [this.game.width / 2, this.game.height / 2 + moveDistance],
            [this.game.width / 2 + moveDistance, this.game.height / 2 + moveDistance]
        ]
    };
};
