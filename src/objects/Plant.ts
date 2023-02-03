import { BACKGROUND_RBG, DISPLAY_SIZE, TILE_SIZE } from '../constants';
import { GameManager } from '../GameManager';

export interface IPlant {
    position: {x: number, y: number};
    isUnder(x: number, y: number) :boolean;
    interactWith(): void;
}

export class Plant extends Phaser.GameObjects.Sprite implements IPlant {
    position: {x: number, y: number};

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x * TILE_SIZE, y * TILE_SIZE, 'plant');
        this.setOrigin(0, 0);
        //this.setScale(this.xScale, this.yScale);
        this.position = {x: x, y: y};
    }

    update(): void {
    }

    public isUnder(x: number, y: number) {
        return x === this.position.x && y === this.position.y; 
    }

    public interactWith() {
        this.destroy();
        GameManager.getInstance().unregisterPlant(this);
    }
}
