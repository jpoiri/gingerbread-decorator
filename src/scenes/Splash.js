import Phaser from 'phaser';

export default class SplashScene extends Phaser.Scene {

    constructor() {
        super('splash');
    }

    create() {
        const text = this.add.text(512, 250, 'Escape from the dungeon', {
            fontSize: '50px',
            fontFamily: 'Verdana',
            fill: '#000'
        });
        text.setStroke('#543873', 6);
        text.setOrigin(0.5, 0.5);
        
        const clickToContinue = this.add.text(512, 400, 'Click to start the game', {
            fontSize: '12px',
            fontFamily: 'Verdana'
        });
        clickToContinue.setOrigin(0.5, 0.5);
    }

    update() {
        if (this.input.manager.activePointer.isDown) {
            this.scene.start('play');
        }
    }

}