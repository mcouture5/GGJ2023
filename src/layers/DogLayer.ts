import { OBSTACLES, TILE_SIZE } from '../constants';
import { GameManager } from '../GameManager';
import { Dog } from '../objects/Dog';
import { Plant } from '../objects/Plant';
import { Harvest } from '../objects/plants/Harvest';
import { GameScene } from "../scenes/GameScene";

export class DogLayer extends Phaser.GameObjects.Container {

    // Input keys
    private left: Phaser.Input.Keyboard.Key;
    private right: Phaser.Input.Keyboard.Key;
    private up: Phaser.Input.Keyboard.Key;
    private down: Phaser.Input.Keyboard.Key;
    private space: Phaser.Input.Keyboard.Key;

    private dog: Dog;
    private heldHarvest: Harvest;

    // From the top left of the matrix
    private dogPosition: number[] = [7,7];

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
        this.dog = new Dog({ scene: this.scene, x: this.dogPosition[0] * TILE_SIZE, y: this.dogPosition[1] * TILE_SIZE, id: 0 });
        this.add(this.dog);
        GameManager.getInstance().registerDog(this.dog);
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
        this.heldHarvest?.update();
    }

    private moveDogLeft() {
        this.requestMove(this.dogPosition[0] - 1, this.dogPosition[1]);
    }

    private moveDogRight() {
        this.requestMove(this.dogPosition[0] + 1, this.dogPosition[1]);
    }

    private moveDogUp() {
        this.requestMove(this.dogPosition[0], this.dogPosition[1] - 1);
    }

    private moveDogDown() {
        this.requestMove(this.dogPosition[0], this.dogPosition[1] + 1);
    }

    private requestMove(x: number, y: number) {
        if (!this.canMove(x, y)) {
            console.log("No move!");
            return;
        }
        this.dogPosition = [x, y];
        this.doMove();
    }

    private doMove() {
        this.dog.moveTo(this.dogPosition[0], this.dogPosition[1], false);
        GameManager.getInstance().dogPosition = [...this.dogPosition];
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

    private interactWith() {
        GameManager.getInstance().interactWith(this.heldHarvest);
    }
    
    public setHoldingPlant(plant: Plant) {
        this.heldHarvest = new Harvest(this.scene, this.dogPosition[0], this.dogPosition[1], plant);
        this.add(this.heldHarvest);
        this.heldHarvest.holdMe(this.dog);
    }
    
    public destroyHarvest() {
        this.heldHarvest.destroy();
        this.heldHarvest = null;
    }
}
