export const DISPLAY_SIZE = {
    width: 1920,
    height: 1080
};

export const BACKGROUND_COLOR = '#e4e4eb';
export const BACKGROUND_HEX_COLOR = 0xe4e4eb;
export const BACKGROUND_RBG = {
    r: 228,
    g: 228,
    b: 235
};

export const TILE_SIZE = 120;

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
    [1,1],[2,1],[3,1],[4,1],[5,1],
    [1,2],[2,2],[3,2],[4,2],[5,2]
];

export const COMPOST: number[][] = [
    [1,7], [2,7], [3,7],
    [1,8], [2,8], [3,8]
];

export const WATERING_HOLE: number[][] = [
    [6,8], [7,8]
];

export const OBSTACLES: number[][] = [...FARMHOUSE, ...COMPOST, ...WATERING_HOLE];
