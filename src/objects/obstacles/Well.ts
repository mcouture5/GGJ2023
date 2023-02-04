import { WATERING_HOLE } from '../../constants';
import { Obstacle } from './Obstacle';

export class Well extends Obstacle {

    // sounds
    private drinkSound: Phaser.Sound.BaseSound;

    constructor(scene: Phaser.Scene) {
        super(scene, [6,8], WATERING_HOLE, 'table');

        this.drinkSound = this.scene.sound.add('drink', {volume: 0.4});
    }

    update(): void {
    }

    public interactWith(): void {
        this.drinkSound.play();
        console.log("Well!!!");
    }
}
