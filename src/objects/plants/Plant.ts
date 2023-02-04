import { BACKGROUND_RBG, DISPLAY_SIZE, TILE_SIZE } from '../../constants';
import { GameManager } from '../../GameManager';
import { Harvest } from './Harvest';

export interface PlantParams {
    scene: Phaser.Scene;
    position: number[];
    key: string;
    prefix: string;
    suffix: string;
    isPrefix: boolean;
}

export class Plant extends Phaser.GameObjects.Container {
    matrixPosition:number[];
    private growTimer: Phaser.Time.TimerEvent;
    private growthStage: number = 0;
    private plantSprite: Phaser.GameObjects.Sprite;
    private text: Phaser.GameObjects.Text;

    // To pass on after we are harvested
    prefix: string;
    suffix: string;
    key: string;
    isPrefix: boolean;

    // sounds
    private growSound: Phaser.Sound.BaseSound;
    private harvestSound: Phaser.Sound.BaseSound;

    constructor(params: PlantParams) {
        //super(scene, (x * TILE_SIZE) + (TILE_SIZE * 0.125), (y * TILE_SIZE) + (TILE_SIZE * 0.125), key);
        //this.setScale(0.75, 0.75);
        super(params.scene, params.position[0] * TILE_SIZE, params.position[1] * TILE_SIZE);
        this.matrixPosition = params.position;
        this.prefix = params.prefix;
        this.suffix = params.suffix;
        this.key = params.key;
        this.isPrefix = params.isPrefix;

        this.growSound = this.scene.sound.add('grow', {volume: 0.01});
        this.harvestSound = this.scene.sound.add('harvest', {volume: 0.5});
    }
    
    create() {
        this.plantSprite = new Phaser.GameObjects.Sprite(this.scene, 0, 0, this.key);
        this.plantSprite.setOrigin(this.isPrefix ? 0 : 1, 0);
        this.plantSprite.setScale(this.isPrefix ? 1 : -1, 1);
        this.plantSprite.setFrame(0, false, false);
        this.add(this.plantSprite);
/*
        this.text = new Phaser.GameObjects.Text(this, 150, 80, this.gameState.bandName, {
            fontFamily: 'Ace',
            fontSize: getTruckFontSize(this.gameState.bandName),
            color: '#fff',
            wordWrap: { width: 2*30, useAdvancedWrap: true }
        }).setOrigin(0, 0);*/
    }

    update(): void {
    }

    public isUnder(x: number, y: number) {
        return x === this.matrixPosition[0] && y === this.matrixPosition[1]; 
    }

    public interactWith(harvest?: Harvest) {
        if (harvest || !this.canBeHarvested()) return;
        GameManager.getInstance().harvestPlant(this);
    }

    public grow(rate?: number) {
        this.growTimer = this.scene.time.addEvent({
            callback: () => {
                this.makeGrowthHappen();
            },
            callbackScope: this,
            delay: 3000,
            repeat: 1,
            loop: false
        });
    }

    /**
     * Do anything here that should be done when the plant gets pulled.
     */
    public harvest(playSound: boolean) {
        this.growTimer.destroy();
        if (playSound) {
            this.harvestSound.play();
        }
    }

    private makeGrowthHappen() {
        this.growthStage++;
        this.plantSprite.setFrame(this.growthStage, false, false);
        this.growSound.play();
    }

    private canBeHarvested() {
        return this.growthStage > 0;
    }
}
