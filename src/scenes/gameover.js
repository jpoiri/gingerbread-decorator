import Phaser from 'phaser';

export default class GameOverScene extends Phaser.Scene {

    constructor() {
        super('gameover');
    }

    create() {
        const text = this.add.text(512, 384, 'Game over', {
            fontSize: '26px'
        });
        text.setOrigin(0.5, 0.5);
    }

}