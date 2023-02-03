import { Plant } from '../Plant';

export class Leek extends Plant {

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, 'leek', 'ed');
    }

    update(): void {
    }
}
