import { OBSTACLES, TILE_SIZE } from '../constants';
import { GameManager } from '../GameManager';
import { Dog } from '../objects/Dog';
import { Plant } from '../objects/plants/Plant';
import { Harvest } from '../objects/plants/Harvest';
import { GameScene } from "../scenes/GameScene";
import P = Phaser.Input.Keyboard.KeyCodes.P;

export class DogLayer extends Phaser.GameObjects.Container {

    // Input keys
    private left: Phaser.Input.Keyboard.Key;
    private right: Phaser.Input.Keyboard.Key;
    private up: Phaser.Input.Keyboard.Key;
    private down: Phaser.Input.Keyboard.Key;
    private space: Phaser.Input.Keyboard.Key;
    private oneKey: Phaser.Input.Keyboard.Key;
    private twoKey: Phaser.Input.Keyboard.Key;

    private dog: Dog;
    private heldHarvest: Harvest;

    // From the top left of the matrix
    private dogPosition: number[] = [7,7];

    // whether a "move" socket event is currently pending, prevents duplicate events from being issued
    private movePending: boolean;

    // kick dirt particle effect
    private kickDirtParticles: Phaser.GameObjects.Particles.ParticleEmitterManager;

    // sounds
    private walkSound: Phaser.Sound.BaseSound;
    private peeSound: Phaser.Sound.BaseSound;
    private kickDirtSound: Phaser.Sound.BaseSound;

    constructor(scene: Phaser.Scene) {
        super(scene, 0, 0);
        this.movePending = false;
    }

    create() {
        this.createDog();
    }

    private createDog() {
        // set up kick dirt particle effect. make sure it's underneath the dog.
        this.scene.load.image('flares');
        this.kickDirtParticles = this.scene.add.particles('flares', 3);
        this.add(this.kickDirtParticles);

        // set up dog
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
        this.oneKey = this.scene.input.keyboard.addKey(
            Phaser.Input.Keyboard.KeyCodes.ONE
        );
        this.twoKey = this.scene.input.keyboard.addKey(
            Phaser.Input.Keyboard.KeyCodes.TWO
        );

        // set up sounds
        this.walkSound = this.scene.sound.add('walk', {volume: 0.05});
        this.peeSound = this.scene.sound.add('pee-2', {volume: 1});
        this.kickDirtSound = this.scene.sound.add('kick-dirt', {volume: 0.6});
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
        if (this.oneKey && Phaser.Input.Keyboard.JustDown(this.oneKey)) {
            this.pee();
        }
        if (this.twoKey && Phaser.Input.Keyboard.JustDown(this.twoKey)) {
            this.kickDirt();
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
        this.walkSound.play();
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

    private pee() {
        this.peeSound.play();
        GameManager.getInstance().peeOnPlant();
    }

    private kickDirt() {
        // play sound
        this.kickDirtSound.play();
        // play particle effect
        let dogCenter: {x: number, y: number} = this.dog.getCenter();
        let emitter = this.kickDirtParticles.createEmitter({
            x: dogCenter.x,
            y: dogCenter.y,
            lifespan: 1000,
            speed: { min: 150, max: 200 },
            angle: { min: 300, max: 310 },
            gravityY: 300,
            scale: { start: 0.4, end: 0 },
            quantity: 1,
            tint: 0xC4A484, // light brown
            blendMode: Phaser.BlendModes.SKIP_CHECK
        });
        let emitterTimer = this.scene.time.delayedCall(250,
            () => {
                emitter.stop();
                emitterTimer.destroy();
            }
        );
        // tell game manager we're kicking dirt on the plant underneath us
        GameManager.getInstance().kickDirtOnPlant();
    }

    public setHoldingPlant(plant: Plant) {
        this.pickupHarvest(new Harvest(this.scene, this.dogPosition[0], this.dogPosition[1], plant));
    }

    public pickupHarvest(harvest: Harvest) {
        this.heldHarvest = harvest;
        this.add(this.heldHarvest);
        this.heldHarvest.holdMe(this.dog);
    }
    
    /**
     * Destroys the harvest, bye bye.
     */
    public destroyHarvest() {
        this.heldHarvest.dropMe();
        this.remove(this.heldHarvest, true);
        this.heldHarvest = null;
    }

    /**
     * Just drops the harvest, no destroy.
     */
    public dropHarvest() {
        this.heldHarvest.dropMe();
        this.remove(this.heldHarvest, false);
        this.heldHarvest = null;
    }
}
