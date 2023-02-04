import { COMPOST, } from '../../constants';
import { GameManager } from '../../GameManager';
import { Obstacle } from './Obstacle';
import { Harvest } from '../plants/Harvest';

export class Compost extends Obstacle {

    // sounds
    private compostSound: Phaser.Sound.BaseSound;

    constructor(scene: Phaser.Scene) {
        super(scene, [1,6], COMPOST, 'compost');

        this.compostSound = this.scene.sound.add('compost', {volume: 0.4});
    }

    update(): void {
    }

    public interactWith(harvest: Harvest): void {
        if (!harvest) return;
        GameManager.getInstance().destroyHarvest(harvest);
        this.compostSound.play();
    }
}
