import { FARMHOUSE } from '../../constants';
import { Obstacle } from './Obstacle';
import { Harvest } from '../plants/Harvest';

export class House extends Obstacle {

    constructor(scene: Phaser.Scene) {
        super(scene, [1,1], FARMHOUSE, 'house');
    }

    update(): void {
    }

    public interactWith(harvest: Harvest): void {
        if (!harvest) return;

        // Destroy if successfull.
        //GameManager.getInstance().destroyHarvest(harvest);
    }
}
