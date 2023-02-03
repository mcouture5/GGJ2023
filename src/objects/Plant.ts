import { BACKGROUND_RBG, DISPLAY_SIZE, TILE_SIZE } from '../constants';
import { GameManager } from '../GameManager';

export class Plant extends Phaser.GameObjects.Sprite {
    matrixPosition: {x: number, y: number};
    fix: string;
    private growTimer: Phaser.Time.TimerEvent;
    private growthStage: number = 0;

    constructor(scene: Phaser.Scene, x: number, y: number, key: string, fix: string) {
        super(scene, x * TILE_SIZE, y * TILE_SIZE, key);
        //super(scene, (x * TILE_SIZE) + (TILE_SIZE * 0.125), (y * TILE_SIZE) + (TILE_SIZE * 0.125), key);
        this.setOrigin(0, 0);
        //this.setScale(0.75, 0.75);
        this.matrixPosition = {x: x, y: y};
        this.fix = fix;
        this.setFrame(0, false, false);
    }
    

    update(): void {
    }

    public isUnder(x: number, y: number) {
        return x === this.matrixPosition.x && y === this.matrixPosition.y; 
    }

    public interactWith() {
        GameManager.getInstance().unregisterPlant(this);
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
     * This is effectively the destory method. Do anything here that should be done when the plant gets pulled.
     */
    public harvest() {
        this.growTimer.destroy();
        this.destroy();
    }

    private makeGrowthHappen() {
        this.growthStage++;
        this.setFrame(this.growthStage, false, false);
    }
}
