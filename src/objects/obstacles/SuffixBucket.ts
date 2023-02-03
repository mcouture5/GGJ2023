import { PREFIX_POS, SUFFIX_POS, WATERING_HOLE } from '../../constants';
import { Obstacle } from './Obstacle';

export class SuffixBucket extends Obstacle {

    constructor(scene: Phaser.Scene) {
        super(scene, {x: 6, y: 8}, SUFFIX_POS, '');
    }

    update(): void {
    }

    public interactWith(): void {
        console.log("Suffix!!!");
    }
}
