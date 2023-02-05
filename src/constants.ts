export const DISPLAY_SIZE = {
    width: 1920,
    height: 1080
};

export const BACKGROUND_COLOR = '#4a5652';
export const BACKGROUND_HEX_COLOR = 0x4a5652;
export const BACKGROUND_RBG = {
    r: 74,
    g: 86,
    b: 82
};

export const TILE_SIZE = 120;

export const GOAL: number = 2500;

// 16 by 9 matrix of 120px squares
export const MATRIX: number[][] = [
    [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15], //0
    [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15], //1
    [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15], //2
    [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15], //3
    [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15], //4
    [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15], //5
    [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15], //6
    [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15], //7
    [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15], //8
];


export const FARMHOUSE: number[][] = [
    [1,1],[2,1],[3,1],[4,1],[5,1]
];

export const PREFIX_POS: number[][] = [
    [1,2],[2,2]
];
export const SUFFIX_POS: number[][] = [
    [4,2],[5,2]
];
export const SHIP_POS: number[][] = [
    [3,2]
];
export const BOARD_POS: number[][] = [
    [6,1],[7,1],
    [6,2],[7,2]
];


export const COMPOST: number[][] = [
    [1,7], [2,7], [3,7], [4,7],
    [1,8], [2,8], [3,8], [4,8]
];

export const WATERING_HOLE: number[][] = [
    [6,8], [7,8]
];

export const PLOTS: number[][] = [
    [9,2], [11,2], [13,2],
    [9,3], [11,3], [13,3],
    [9,4], [11,4], [13,4],
    [9,5], [11,5], [13,5],
    [9,6], [11,6], [13,6]
];

export const OBSTACLES: number[][] = [...FARMHOUSE, ...PREFIX_POS, ...SUFFIX_POS, ...SHIP_POS, ...BOARD_POS, ...COMPOST, ...WATERING_HOLE];

export enum ROOT_TYPE {
    PREFIXABLE, SUFFIXABLE, BOTHABLE
};

export const PREFIXABLES: string[] = ['appear', 'break', 'build', 'friend', 'joy', 'kind', 'play', 'read', 'act', 'fix', 'list', 'trust', 'soak'];
export const SUFFIXABLES: string[] = ['appear', 'break', 'build', 'comfort', 'faith', 'fear', 'friend', 'joy', 'kind', 'play', 'read', 'act', 'fix', 'light', 'list', 'trust', 'soak'];
export const BOTHABLES = ['appear', 'break', 'build', 'comfort', 'faith', 'joy', 'play', 'act', 'trust', 'soak'];

export const ROOTS: string[] = [
    'appear',
    'break',
    'build',
    'comfort',
    'faith',
    'fear',
    'friend',
    'joy',
    'kind',
    'order',
    'play',
    'read',
    'act',
    'fix',
    'light',
    'list',
    'trust',
    'soak'
];

export const WORDS: string[] = [
    'disappear',
    'discomfort',
    'distrust',
    'display',
    'enjoy',
    'enact',
    'entrust',
    'enlight',
    'overbuild',
    'overjoy',
    'overplay',
    'overread',
    'overact',
    'overbreak',
    'overfear',
    'overkind',
    'reappear',
    'rebuild',
    'replay',
    'reread',
    'react',
    'refix',
    'relight',
    'prebreak',
    'prefix',
    'presoak',
    'unbreak',
    'unbuild',
    'unfriend',
    'unkind',
    'unfix',
    'unlight',
    'untrust',
    'appearable',
    'breakable',
    'buildable',
    'comfortable',
    'fearable',
    'playable',
    'readable',
    'fixable',
    'lightable',
    'listable',
    'trustable',
    'appeared',
    'comforted',
    'feared',
    'friended',
    'played',
    'acted',
    'fixed',
    'lighted',
    'listed',
    'trusted',
    'faithful',
    'joyful',
    'fearful',
    'playful',
    'trustful',
    'appearing',
    'breaking',
    'building',
    'comforting',
    'fearing',
    'playing',
    'reading',
    'acting',
    'fixing',
    'lighting',
    'listing',
    'trusting',
    'soaking',
    'breakless',
    'comfortless',
    'faithless',
    'fearless',
    'friendless',
    'joyless',
    'kindless',
    'playless',
    'lightless',
    'listless',
    'trustless',
    'disappearing',
    'discomforting',
    'disappeared',
    'distrusting',
    'distrusted',
    'enjoying',
    'enacting',
    'enacted',
    'entrusting',
    'entrusted',
    'overbuilding',
    'overjoyed',
    'overreading',
    'overacting',
    'overacted',
    'overfearing',
    'overfeared',
    'reappearing',
    'rebuilding',
    'reappeared',
    'replaying',
    'replayed',
    'rereading',
    'rebuildable',
    'replayable',
    'refixed',
    'presoaking',
    'presoaked',
    'unbreakable',
    'unbuildable',
    'unfixable',
    'unlightable',
    'untrustable',
    'uncomfortable',
    'unread',
    'unfaithful',
    'unfearful',
    'unplayful',
    'unkindly',
    'kindly',
    'friendly',
    'normally',
    'lightly',
    'unfriendly',
    'resoak',
    'resoaking',
    'soakable',
    'unsoakable',
    'preread',
    'soaked',
    'oversoaked',
    'unplayable',
    'reacted',
    'reacting',
    'distrustful',
    'overplayed',
    'enlist',
    'enlisted',
    'enlisting',
    'unreadable',
    'enjoyable',
    'oversoak',
    'reorder',
    'reordered',
    'preorder',
    'preordered',
    'ordering',
    'preordering',
    'disorder',
    'disordered',
    'ordered',
    'overorder',
    'overordered',
    'overordering',
    'unorder',
    'unordered',
    'unordering',
    'orderable',
    'orderless',
    'orderly',
    'unorderly',
    'preorderly',
    'disorderly',
    'unorderable',
    'relist',
    'relisted',
    'relisting',
    'unplayed',
    'prefixed'
];