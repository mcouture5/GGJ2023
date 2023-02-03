import { Plant } from '../Plant';

export class Turnip extends Plant {

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, 'turnip', 'ed');
    }

    update(): void {
    }
}
