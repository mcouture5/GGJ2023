import { COMPOST, } from '../constants';
import { Obstacle } from './Obstacle';

export class Compost extends Obstacle {

    constructor(scene: Phaser.Scene) {
        super(scene, {x: 1, y: 7}, COMPOST, 'compost');
    }

    update(): void {
    }

    public interactWith(): void {
        console.log("Compost!!!");
    }
}
