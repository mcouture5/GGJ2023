import { Plant } from '../Plant';

export class Beet extends Plant {

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, 'beet', 'ed');
    }

    update(): void {
    }
}
