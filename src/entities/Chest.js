import Phaser from 'phaser';
import ItemContainer from './ItemContainer';

export default class Chest extends ItemContainer {

	locked = true;
	lockedMessage = null;
	opened = false;

	constructor(scene, x, y, texture, frame, name, locked, lockedMessage, spawnItem, spawnItemTexture, spawnItemFrame, spawnItemDescription) {
		super(scene, x, y, texture, frame, name, spawnItem, spawnItemTexture, spawnItemFrame, spawnItemDescription);
		scene.add.existing(this);
		this.setInteractive();
		this.name = name;
		this.locked = locked;
		this.lockedMessage = lockedMessage;
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
	
	isOpened() {
		return this.opened;
	}

	setOpened(opened) {
		this.opened = opened;
	}
}
