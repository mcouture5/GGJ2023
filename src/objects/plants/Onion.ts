import { Plant } from '../Plant';

export class Onion extends Plant {

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, 'onion', 'ing');
    }

    update(): void {
    }
}
