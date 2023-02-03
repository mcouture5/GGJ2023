import { Plant } from '../Plant';

export class Potato extends Plant {

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, 'potato', 'ly');
    }

    update(): void {
    }
}
