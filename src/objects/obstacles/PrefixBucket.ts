import { PREFIX_POS, WATERING_HOLE } from '../../constants';
import { Harvest } from '../plants/Harvest';
import { Obstacle } from './Obstacle';

export class PrefixBucket extends Obstacle {

    constructor(scene: Phaser.Scene) {
        super(scene, {x: 6, y: 8}, PREFIX_POS, '');
    }

    update(): void {
    }

    public interactWith(harvest?: Harvest): void {
        console.log("Prefix!!!");
    }
}
