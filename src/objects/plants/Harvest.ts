import { TILE_SIZE } from '../../constants';
import { Dog } from '../Dog';
import { Plant } from './Plant';

export class Harvest extends Phaser.GameObjects.Container {
    private sprite: Phaser.GameObjects.Sprite;
    private textObject: Phaser.GameObjects.Text;
    // Properties from the now destroyed plant
    text: string;
    isRot: boolean;

    // Dog reference, after all, it is holding me...
    dog: Dog;

    constructor(scene: Phaser.Scene, x: number, y: number, plant: Plant) {
        super(scene, x * TILE_SIZE, y * TILE_SIZE);
        this.isRot = plant.isRot;
        this.text = plant.isPrefix ? plant.prefix : plant.suffix;
        this.sprite = new Phaser.GameObjects.Sprite(this.scene, 0, -30, plant.isRot ? 'rot' : 'harvest').setOrigin(0.5,0.5).setScale(0.75, 0.75);
        this.add(this.sprite);
        
        this.textObject = new Phaser.GameObjects.Text(this.scene, 0, -40, this.text, {
            fontFamily: 'Ace',
            fontSize: '36px',
            color: '#000'
        }).setOrigin(0.5, 0);
        this.add(this.textObject);
    }

    update(): void {
        this.followDog();
    }

    public holdMe(dog: Dog) {
        // Scale the whole thing to include the text
        this.setScale(1, 1);
        this.dog = dog;
        this.dog.setIsCarrying(true);
    }

    public dropMe() {
        // Scale the whole thing to include the text
        this.setScale(0.7, 0.7);
        this.dog.setIsCarrying(false);
        this.dog = null;
    }

    private followDog() {
        this.dog && this.setX(this.dog.x + 60);
        this.dog && this.setY(this.dog.y + (this.isRot ? 12 : 3));
    }
}
