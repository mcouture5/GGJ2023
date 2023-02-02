import { BACKGROUND_RBG, DISPLAY_SIZE, TILE_SIZE } from '../constants';
import { DogLayer } from '../layers/DogLayer';

export class GameScene extends Phaser.Scene {
    private farm: Phaser.GameObjects.Sprite;

    // Layers
    private dogLayer: DogLayer;

    // 16 by 9 matrix of 120px squares
    private matrix: Number[][] = [
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

    constructor() {
        super({
            key: 'GameScene'
        });
    }

    create(): void {
        let centerX = DISPLAY_SIZE.width / 2;
        let centerY = DISPLAY_SIZE.height / 2;

        this.farm = this.add.sprite(centerX, centerY, 'farm').setOrigin(0.5, 0.5);

        // The matrix is always there, you just need to see it.
        this.createMatrix();
        
        this.dogLayer = new DogLayer(this);
        this.add.existing(this.dogLayer);
        this.dogLayer.create();
    }

    update(): void {
        this.dogLayer.update();
    }

    private createMatrix() {
        for (let y = 0; y < this.matrix.length; y++) {
            for (let x = 0; x < this.matrix[y].length; x++) {
                let square = this.add.graphics();
                square.lineStyle(1, 0xFF0000, 1);
                square.fillStyle(0x000000, 0);
                square.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
                square.strokeRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
            }
        }
    }
}