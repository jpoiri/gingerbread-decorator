import Phaser from 'phaser';
import GameScene from './scenes/game';

const config = {
	type: Phaser.AUTO,
	scale: {
		mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
		width: 800,
		height: 600
	},
	physics: {
		default: 'arcade',
		arcade: {
			debug: true,
			gravity: { y: 200 }
		}
	},
	scene: GameScene
};

const game = new Phaser.Game(config);
