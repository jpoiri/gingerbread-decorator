import Phaser from 'phaser';

export default class Door extends Phaser.Physics.Arcade.Sprite {
	name = null;
	locked = false;
	lockedMessage = null;

	constructor(scene, x, y, texture, frame, name, locked, lockedMessage) {
		console.log(frame);
		super(scene, x, y, texture, frame);
		this.name = name;
		this.locked = locked;
		this.lockedMessage = lockedMessage;
		scene.add.existing(this);
		this.setScale(2);
		this.setInteractive();
	}

	getName() {
		return this.name;
	}

	setName(name) {
		this.name = name;
	}

	lock() {
		this.locked = true;
	}

	unlock() {
		this.locked = false;
	}

	isLocked() {
		return this.locked;
	}

	setLockedMessage(message) {
		this.lockedMessage = message;
	}

	getLockedMessage() {
		return this.lockedMessage;
	}
}
