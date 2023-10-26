import Phaser from 'phaser';

export default class Sign extends Phaser.Physics.Arcade.Image {
	text = null;
	name = null;
	visible = false;

	constructor(scene, x, y, name, text, visible) {
		super(scene, x, y);
		scene.add.existing(this);
		this.setOrigin(0, 0);
		this.setInteractive();
		this.name = name;
		this.text = text;
		this.visible = visible;
	}

	getName() {
		return this.name;
	}

	setName(name) {
		this.name = name;
	}

	getText() {
		return this.text;
	}

	setText(text) {
		this.text = text;
	}

	isVisible() {
		return this.visible;
	}

	setVisible(visible) {
		this.visible = visible;
	}
}
