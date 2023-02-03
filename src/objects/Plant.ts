import { BACKGROUND_RBG, DISPLAY_SIZE, TILE_SIZE } from '../constants';
import { GameManager } from '../GameManager';
import { Harvest } from './plants/Harvest';

export class Plant extends Phaser.GameObjects.Sprite {
    matrixPosition: {x: number, y: number};
    private growTimer: Phaser.Time.TimerEvent;
    private growthStage: number = 0;

    // To pass on after we are harvested
    fix: string;
    key: string;

    // sounds
    private growSound: Phaser.Sound.BaseSound;
    private harvestSound: Phaser.Sound.BaseSound;

    constructor(scene: Phaser.Scene, x: number, y: number, key: string, fix: string) {
        super(scene, x * TILE_SIZE, y * TILE_SIZE, key);
        //super(scene, (x * TILE_SIZE) + (TILE_SIZE * 0.125), (y * TILE_SIZE) + (TILE_SIZE * 0.125), key);
        this.setOrigin(0, 0);
        //this.setScale(0.75, 0.75);
        this.matrixPosition = {x: x, y: y};
        this.fix = fix;
        this.key = key;
        this.setFrame(0, false, false);

        this.growSound = this.scene.sound.add('grow', {volume: 0.01});
        this.harvestSound = this.scene.sound.add('harvest', {volume: 0.5});
    }
    

    update(): void {
    }

    public isUnder(x: number, y: number) {
        return x === this.matrixPosition.x && y === this.matrixPosition.y; 
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
    public harvest() {
        this.growTimer.destroy();
        this.harvestSound.play();
    }

    private makeGrowthHappen() {
        this.growthStage++;
        this.setFrame(this.growthStage, false, false);
        this.growSound.play();
    }

    private canBeHarvested() {
        return this.growthStage > 0;
    }
}
