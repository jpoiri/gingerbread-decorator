import ItemContainer from './ItemContainer';

export default class Safe extends ItemContainer {

    combination = null;
    promptMessage = null;
    opened = false;

    constructor(scene, x, y, texture, frame, name, combination, promptMessage, spawnItem, spawnItemTexture, spawnItemFrame, spawnItemDescription) {
		super(scene, x, y, texture, frame, name, spawnItem, spawnItemTexture, spawnItemFrame, spawnItemDescription);
		scene.add.existing(this);
		this.setInteractive();
		this.name = name;
		this.combination = combination;
		this.promptMessage = promptMessage;
    }
    
    getCombination() {
        return this.combination;
    }

    setCombination(combination) {
        this.combination = combination;
    }

    getPromptMessage() {
        return this.promptMessage;
    }

    setPromptMessage(message) {
        this.promptMessage = message;
    }

    isOpened() {
        return this.opened;
    }

    setOpened(opened) {
        this.opened;
    }
}