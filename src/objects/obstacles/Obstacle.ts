import { BACKGROUND_RBG, DISPLAY_SIZE, TILE_SIZE } from '../../constants';
import { Plant } from '../plants/Plant';
import { Harvest } from '../plants/Harvest';

export interface IObstacle {
    isAbove(x: number, y: number): boolean;
    isBelow(x: number, y: number): boolean;
    isLeftOf(x: number, y: number): boolean;
    isRightOf(x: number, y: number): boolean;
    interactWith(harvest?: Harvest): void;
}


export class Obstacle extends Phaser.GameObjects.Container implements IObstacle {
    protected sprite: Phaser.GameObjects.Sprite;
    private spritePosition: number[];
    private matrix: number[][];

    constructor(scene: Phaser.Scene, position: number[], matrix: number[][], key: string) {
        super(scene, position[0] * TILE_SIZE, position[1] * TILE_SIZE);
        this.spritePosition = position;
        this.matrix = matrix;

        this.sprite = new Phaser.GameObjects.Sprite(this.scene, 0, 0, key).setOrigin(0,0);
        this.add(this.sprite);
    }

    update(): void {
    }

    /**
     * If this obstacle is ABOVE the dog.
     */
    public isAbove(x: number, y: number): boolean {
        for (let tile of this.matrix) {
            let tileX = tile[0];
            let tileY = tile[1];
            if (tileX == x && tileY == y - 1) {
                return true;
            }
        }
        return false;
    }
    
    /**
     * If this obstacle is BELOW the dog.
     */
    public isBelow(x: number, y: number): boolean {
        for (let tile of this.matrix) {
            let tileX = tile[0];
            let tileY = tile[1];
            if (tileX == x && tileY == y + 1) {
                return true;
            }
        }
        return false;
    }
    
    /**
     * If this obstacle is LEFT OF the dog.
     */
    public isLeftOf(x: number, y: number): boolean {
        for (let tile of this.matrix) {
            let tileX = tile[0];
            let tileY = tile[1];
            if (tileX == x - 1 && tileY == y) {
                return true;
            }
        }
        return false;
    }
    
    /**
     * If this obstacle is RIGHT OF the dog.
     */
    public isRightOf(x: number, y: number): boolean {
        for (let tile of this.matrix) {
            let tileX = tile[0];
            let tileY = tile[1];
            if (tileX == x + 1 && tileY == y) {
                return true;
            }
        }
        return false;
    }

    public interactWith(harvest?: Harvest) {
        // Override me!
    }
}
