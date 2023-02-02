import { TILE_SIZE } from '../constants';
import { Dog } from '../objects/Dog';
import { GameScene } from "../scenes/GameScene";

export class DogLayer extends Phaser.GameObjects.Container {

    private static readonly MIN_ZOOM_LEVEL = 0.75;

    // Input keys
    private left: Phaser.Input.Keyboard.Key;
    private right: Phaser.Input.Keyboard.Key;
    private up: Phaser.Input.Keyboard.Key;
    private down: Phaser.Input.Keyboard.Key;

    private dog: Dog;

    // From the top left of the matrix
    private dogPosition: {x: number, y: number} = {x: 1, y: 1};

    // whether a "move" socket event is currently pending, prevents duplicate events from being issued
    private movePending: boolean;

    constructor(scene: Phaser.Scene) {
        super(scene, 0, 0);
        this.movePending = false;
    }

    create() {
        this.createDog();
    }

    private createDog() {
        this.dog = new Dog({ scene: this.scene, x: this.dogPosition.x * TILE_SIZE, y: this.dogPosition.y * TILE_SIZE, id: 0 });
        this.add(this.dog);
        this.left = this.scene.input.keyboard.addKey(
            Phaser.Input.Keyboard.KeyCodes.LEFT
        );
        this.right = this.scene.input.keyboard.addKey(
            Phaser.Input.Keyboard.KeyCodes.RIGHT
        );
        this.up = this.scene.input.keyboard.addKey(
            Phaser.Input.Keyboard.KeyCodes.UP
        );
        this.down = this.scene.input.keyboard.addKey(
            Phaser.Input.Keyboard.KeyCodes.DOWN
        );
    }
    
    update() {
        if (this.left && Phaser.Input.Keyboard.JustDown(this.left)) {
            this.moveDogLeft();
        }
        if (this.right && Phaser.Input.Keyboard.JustDown(this.right)) {
            this.moveDogRight();
        }
        if (this.up && Phaser.Input.Keyboard.JustDown(this.up)) {
            this.moveDogUp();
        }
        if (this.down && Phaser.Input.Keyboard.JustDown(this.down)) {
            this.moveDogDown();
        }
    }

    private moveDogLeft() {
        const x = this.dogPosition.x - 1;
        const y = this.dogPosition.y;
        if (!this.canMove(x, y)) {
            console.log("No move left!");
            return;
        }
        this.dogPosition = {x: x, y: y};
        this.dog.moveTo(x, y, false);
    }

    private moveDogRight() {
        const x = this.dogPosition.x + 1;
        const y = this.dogPosition.y;
        if (!this.canMove(x, y)) {
            console.log("No move right!");
            return;
        }
        this.dogPosition = {x: x, y: y};
        this.dog.moveTo(x, y, false);
    }

    private moveDogUp() {
        const x = this.dogPosition.x;
        const y = this.dogPosition.y - 1;
        if (!this.canMove(x, y)) {
            console.log("No move up!");
            return;
        }
        this.dogPosition = {x: x, y: y};
        this.dog.moveTo(x, y, false);
    }

    private moveDogDown() {
        const x = this.dogPosition.x;
        const y = this.dogPosition.y + 1;
        if (!this.canMove(x, y)) {
            console.log("No move down!");
            return;
        }
        this.dogPosition = {x: x, y: y};
        this.dog.moveTo(x, y, false);
    }

    private canMove(x: number, y: number): boolean {
        const outOfBounds = x < 0 || x >= 16 || y < 0 || y >= 9;
        return !outOfBounds;
    }
}
