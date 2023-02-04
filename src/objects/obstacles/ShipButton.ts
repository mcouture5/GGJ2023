import { COMPOST, SHIP_POS, } from '../../constants';
import { GameManager } from '../../GameManager';
import { Obstacle } from './Obstacle';
import { Harvest } from '../plants/Harvest';

export class ShipButton extends Obstacle {

    constructor(scene: Phaser.Scene) {
        super(scene, [3,2], SHIP_POS, 'ship');
        this.setPosition(this.x - 16, this.y + 53);
    }

    update(): void {
    }

    public interactWith(): void {
        GameManager.getInstance().testWord()
    }
}
