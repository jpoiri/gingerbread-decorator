import Phaser from 'phaser';

export default class WinningScene extends Phaser.Scene {

    constructor() {
        super('winning');
    }

    create() {
        const text = this.add.text(512, 384, 'Congratulations! Thank you for playing this escape room!', {
            fontSize: '26px'
        });
        text.setOrigin(0.5, 0.5);
    }

}