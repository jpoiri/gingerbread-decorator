import Phaser from 'phaser';

export default class CongrulationScene extends Phaser.Scene {

    constructor() {
    }

    create() {
        this.add.text(500, 500, 'Congraluation');
    }

}