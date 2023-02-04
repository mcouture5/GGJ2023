import { Plant } from './Plant';

export class Onion extends Plant {

    constructor(scene: Phaser.Scene, x: number, y: number, isPrefix: boolean) {
        super({
            scene: scene,
            position: [x,y],
            key: 'onion',
            prefix: 'pre',
            suffix: 'ly',
            isPrefix: isPrefix
        });
    }

    update(): void {
    }
}
