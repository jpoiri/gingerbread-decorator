import Phaser, { Tilemaps } from 'phaser';

export default class ItemContainer extends Phaser.Physics.Arcade.Sprite {
    name = null;
    spawnItemName = null;
	spawnItemTexture = null;
	spawnItemFrame = null;
	spawnItemDescription = null;

	constructor(scene, x, y, texture, frame, name, spawnItemName, spawnItemTexture, spawnItemFrame, spawnItemDescription) {
        super(scene, x, y, texture, frame);
        this.name = name;
        this.spawnItemName = spawnItemName;
        this.spawnItemTexture = spawnItemTexture;
        this.spawnItemFrame = spawnItemFrame;
        this.spawnItemDescription = spawnItemDescription;
    }

    setName(name) {
        this.name = name;
    }

    getName() {
        return this.name;
    }

    setSpawnItem(spawnItemName) {
        this.spawnItemName = spawnItemName;
    }

    getSpawnItemName() {
        return this.spawnItemName;
    }

    setSpawnItemTexture(texture) {
        this.spawnItemTexture = texture
    }

    getSpawnItemTexture() {
        return this.spawnItemTexture;
    }

    setSpawnItemFrame(frame) {
        this.spawnItemFrame = frame;
    }

    getSpawnItemFrame() {
        return this.spawnItemFrame;
    }

    setSpawnItemDescription(description) {
       this.spawnItemDescription = description; 
    }

    getSpawnItemDescription() {
        return this.spawnItemDescription;
    }
}
