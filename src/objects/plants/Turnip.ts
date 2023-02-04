import { Plant } from './Plant';

export class Turnip extends Plant {

    constructor(scene: Phaser.Scene, x: number, y: number, isPrefix: boolean) {
        super({
            scene: scene,
            position: [x,y],
            key: 'turnip',
            prefix: 'un',
            suffix: 'ness',
            isPrefix: isPrefix
        });
    }

    update(): void {
    }
}
