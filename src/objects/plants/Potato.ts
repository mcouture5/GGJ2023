import { Plant } from './Plant';

export class Potato extends Plant {

    constructor(scene: Phaser.Scene, x: number, y: number, isPrefix: boolean) {
        super({
            scene: scene,
            position: [x,y],
            key: 'potato',
            prefix: 'pre',
            suffix: 'ly',
            isPrefix: isPrefix
        });
    }

    update(): void {
    }
}
