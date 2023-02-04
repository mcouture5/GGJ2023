import { Plant } from './Plant';

export class Carrot extends Plant {

    constructor(scene: Phaser.Scene, x: number, y: number, isPrefix: boolean) {
        super({
            scene: scene,
            position: [x,y],
            key: 'carrot',
            prefix: 'en',
            suffix: 'ful',
            isPrefix: isPrefix
        });
    }

    update(): void {
    }
}
