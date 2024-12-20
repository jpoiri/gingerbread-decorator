const Color = Object.freeze({
	RED: 0xff0000,
	PINK: 0xff7878,
	GREEN: 0x146b3a,
	PALE_GREEN: 0x74d680,
	BLUE: 0x8cd4ff,
	PALE_BLUE: 0xc6efff,
	YELLOW: 0xfac711,
	OFF_WHITE: 0xeef6f2,
	WHITE: 0xFFFFFF,
    BLACK: 0x000000,
    GRAY: 0xd3d3d3
});

const Key = Object.freeze({
    HOUSE_NUMBER: 'house-number',
    HOUSE: 'house',
    ERASER_ICON: 'eraser-icon',
    STAMP_ICON: 'stamp-icon',
});

const TextureKey = Object.freeze({
    CANDY_CANE: 'candy-cane',
    GUMMY_BEAR: 'gummy-bear',
    SWEETS: 'sweets',
    MINT: 'mint',
    CANDY: 'candy',
    CHOCOLATE: 'chocolate',
    PEPPERMINT: 'peppermint',
    CANDY_2: 'candy2',
    GUM: 'gum',
    TRUFFLE: 'truffle',
    JELLY_BEANS: 'jelly-beans',
    SPRINKLES: 'sprinkles',
    LOLLIPOP: 'lollipop',
    GINGERBREAD_MAN: 'gingerbread-man',
    ERASER_ICON: 'eraser-icon',
    STAMP_ICON: 'stamp-icon',
    HOUSE: 'house'
});

const StampSize = Object.freeze({
    SMALL: 0.5,
    NORMAL: 1,
    LARGE: 2,
    EXTRA_LARGE: 3
});

const Tool = Object.freeze({
    CIRCLE: 'circle',
    STROKE_CIRCLE: 'stroke-circle',
    SQUARE: 'square',
    STROKE_SQUARE: 'stroke-square',
    STAR: 'star',
    STROKE_STAR: 'stroke-star',
    ERASER: 'eraser',
    STAMP: 'stamp'
});

export { Color, Key, TextureKey, StampSize, Tool } 