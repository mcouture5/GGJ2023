import { TILE_SIZE } from '../../constants';
import { Dog } from '../Dog';
import { Plant } from '../Plant';

export class Harvest extends Phaser.GameObjects.Sprite {

    // Properties from the now destroyed plant
    fix: string;
    key: string;

    // Dog reference, after all, it is holding me...
    dog: Dog;

    constructor(scene: Phaser.Scene, x: number, y: number, plant: Plant) {
        super(scene, x * TILE_SIZE, y * TILE_SIZE, `${plant.key}-harvested`);
        this.fix = plant.fix;
        this.key = plant.key;
    }

    update(): void {
        this.followDog();
    }

    public holdMe(dog: Dog) {
        this.dog = dog;
    }

    public dropMe() {
        this.dog = null;
    }

    private followDog() {
        this.dog && this.setX(this.dog.x);
        this.dog && this.setY(this.dog.y);
    }
}
