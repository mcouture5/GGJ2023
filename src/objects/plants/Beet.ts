import { Plant } from './Plant';

export class Beet extends Plant {

    constructor(scene: Phaser.Scene, x: number, y: number, isPrefix: boolean) {
        super({
            scene: scene,
            position: [x,y],
            key: 'beet',
            prefix: 'dis',
            suffix: 'ed',
            isPrefix: isPrefix
        });
    }

    update(): void {
    }
}
