import { WATERING_HOLE } from '../../constants';
import { Obstacle } from './Obstacle';

export class Well extends Obstacle {

    constructor(scene: Phaser.Scene) {
        super(scene, {x: 6, y: 8}, WATERING_HOLE, 'well');
    }

    update(): void {
    }

    public interactWith(): void {
        console.log("Well!!!");
    }
}
