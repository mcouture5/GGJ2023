import { OBSTACLES, TILE_SIZE } from '../constants';
import { GameManager } from '../GameManager';
import { Dog } from '../objects/Dog';
import { GameScene } from "../scenes/GameScene";

export class DogLayer extends Phaser.GameObjects.Container {

    private static readonly MIN_ZOOM_LEVEL = 0.75;

    // Input keys
    private left: Phaser.Input.Keyboard.Key;
    private right: Phaser.Input.Keyboard.Key;
    private up: Phaser.Input.Keyboard.Key;
    private down: Phaser.Input.Keyboard.Key;
    private space: Phaser.Input.Keyboard.Key;

    private dog: Dog;

    // From the top left of the matrix
    private dogPosition: {x: number, y: number} = {x: 7, y: 7};

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
        this.space = this.scene.input.keyboard.addKey(
            Phaser.Input.Keyboard.KeyCodes.SPACE
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
        if (this.space && Phaser.Input.Keyboard.JustDown(this.space)) {
            this.interactWith();
        }
    }

    private moveDogLeft() {
        this.requestMove(this.dogPosition.x - 1, this.dogPosition.y);
    }

    private moveDogRight() {
        this.requestMove(this.dogPosition.x + 1, this.dogPosition.y);
    }

    private moveDogUp() {
        this.requestMove(this.dogPosition.x, this.dogPosition.y - 1);
    }

    private moveDogDown() {
        this.requestMove(this.dogPosition.x, this.dogPosition.y + 1);
    }

    private requestMove(x: number, y: number) {
        if (!this.canMove(x, y)) {
            console.log("No move!");
            return;
        }
        this.dogPosition = {x: x, y: y};
        this.doMove();
    }

    private doMove() {
        this.dog.moveTo(this.dogPosition.x, this.dogPosition.y, false);
        console.log(this.dogPosition);
        this.getNeighbors();
    }

    private canMove(x: number, y: number): boolean {
        const outOfBounds = x < 0 || x >= 16 || y < 0 || y >= 9;
        if (outOfBounds) return false;
        let obstacleInTheWay = false;
        for (let tile of OBSTACLES) {
            if (tile[0] == x && tile[1] == y) {
                obstacleInTheWay = true;
                break;
            }
        }
        if (obstacleInTheWay) return false;
        return true;
    }

    private getNeighbors() {
        let neighbors = GameManager.getInstance().getNeighbors(this.dogPosition.x, this.dogPosition.y);
        console.log("Neighbors", neighbors);
    }

    private interactWith() {
        GameManager.getInstance().interactWith();
    }
}
