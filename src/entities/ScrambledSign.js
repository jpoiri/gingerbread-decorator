import Sign from './Sign';

export default class ScrambledSign extends Sign {

    scrambled = true;
    scrambledText = null;

	constructor(scene, x, y, name, text, visible, scrambled, scrambledText) {
        super(scene, x, y, name, text, visible);
        this.scrambled = scrambled;
        this.scrambledText = scrambledText;
    }
    
    isScrambled() {
        return this.scrambled;
    }

    setScrambled(scrambled) {
        this.scrambled = scrambled;
    }

    getScrambledText() {
        return this.scrambledText;
    }

    setScrambledText(text) {
        this.scrambledText = text;
    }
}
