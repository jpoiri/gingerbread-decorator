import Phaser from 'phaser';

export default class WinningScene extends Phaser.Scene {

    constructor() {
        super('win');
    }

    create() {
        const text = this.add.text(512, 384, 'Congratulations, you have escaped? Thank you for playing!', {
            fontSize: '22px'
        });
        text.setOrigin(0.5, 0.5);
    }

}