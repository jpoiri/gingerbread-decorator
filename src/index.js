import Phaser from 'phaser';
import GameScene from './scenes/game';
import GameOverScene  from './scenes/gameover';
import CongraluationScene from './scenes/congrat';

const config = {
	type: Phaser.AUTO,
	scale: {
		mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
		width: 1024,
		height: 768
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
