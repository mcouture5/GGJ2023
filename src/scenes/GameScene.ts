import { BACKGROUND_RBG, DISPLAY_SIZE, TILE_SIZE } from '../constants';
import { GameManager } from '../GameManager';
import { DogLayer } from '../layers/DogLayer';
import { FarmLayer } from '../layers/FarmLayer';

export class GameScene extends Phaser.Scene {

    // Layers
    private farmLayer: FarmLayer;
    private dogLayer: DogLayer;

    constructor() {
        super({
            key: 'GameScene'
        });
    }

    create(): void {
        this.farmLayer = new FarmLayer(this);
        this.add.existing(this.farmLayer);
        this.farmLayer.create();
        GameManager.getInstance().farmLayer = this.farmLayer;
        
        this.dogLayer = new DogLayer(this);
        this.add.existing(this.dogLayer);
        this.dogLayer.create();
        GameManager.getInstance().dogLayer = this.dogLayer;
    }

    update(): void {
        this.farmLayer.update();
        this.dogLayer.update();
    }

}