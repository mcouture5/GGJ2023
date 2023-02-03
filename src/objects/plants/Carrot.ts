import { Plant } from '../Plant';

export class Carrot extends Plant {

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, 'carrot', 'ed');
    }

    update(): void {
    }
}
