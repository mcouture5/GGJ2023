import { COMPOST, } from '../../constants';
import { GameManager } from '../../GameManager';
import { Obstacle } from './Obstacle';
import { Harvest } from '../plants/Harvest';

export class Compost extends Obstacle {

    constructor(scene: Phaser.Scene) {
        super(scene, [1,6], COMPOST, 'compost');
    }

    update(): void {
    }

    public interactWith(harvest: Harvest): void {
        if (!harvest) return;
        GameManager.getInstance().compostHarvest(harvest);
    }
}
