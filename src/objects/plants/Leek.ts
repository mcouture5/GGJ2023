import { Plant } from './Plant';

export class Leek extends Plant {

    constructor(scene: Phaser.Scene, x: number, y: number, isPrefix: boolean) {
        super({
            scene: scene,
            position: [x,y],
            key: 'leek',
            prefix: 'over',
            suffix: 'able',
            isPrefix: isPrefix
        });
    }

    update(): void {
    }
}
