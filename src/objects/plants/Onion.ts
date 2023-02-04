import { Plant } from './Plant';

export class Onion extends Plant {

    constructor(scene: Phaser.Scene, x: number, y: number, isPrefix: boolean) {
        super({
            scene: scene,
            position: [x,y],
            key: 'onion',
            prefix: 're',
            suffix: 'less',
            isPrefix: isPrefix
        });
    }

    update(): void {
    }
}
