import { WATERING_HOLE } from '../../constants';
import { Obstacle } from './Obstacle';
import {GameManager} from "../../GameManager";

export class Well extends Obstacle {

    // sounds
    private drinkSound: Phaser.Sound.BaseSound;
    private eatSound: Phaser.Sound.BaseSound;

    constructor(scene: Phaser.Scene) {
        super(scene, [6,8], WATERING_HOLE, 'table');

        this.drinkSound = this.scene.sound.add('drink', {volume: 0.4});
        this.eatSound = this.scene.sound.add('eat', {volume: 0.1});
    }

    update(): void {
    }

    public interactWith(): void {
        let prevDrink = GameManager.getInstance().drink;
        GameManager.getInstance().drink = Math.min(GameManager.getInstance().maxDrink, GameManager.getInstance().drink + 1);
        if (GameManager.getInstance().drink !== prevDrink) {
            this.drinkSound.play();
        }
        let prevFood = GameManager.getInstance().food;
        GameManager.getInstance().food = Math.min(GameManager.getInstance().maxFood, GameManager.getInstance().food + 1);
        if (GameManager.getInstance().food !== prevFood) {
            this.eatSound.play();
        }
        console.log("Well!!!");
    }
}
