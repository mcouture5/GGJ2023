import { FARMHOUSE } from '../constants';
import { Obstacle } from './Obstacle';

export class House extends Obstacle {

    constructor(scene: Phaser.Scene) {
        super(scene, {x: 1, y: 1}, FARMHOUSE, 'house');
    }

    update(): void {
    }

    public interactWith(): void {
        console.log("House!!!");
    }
}
