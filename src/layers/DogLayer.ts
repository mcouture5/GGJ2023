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
    // Need to keep a copy of the one being composted so we dont try to trash the one we just trashed. WHAT.
    private compostingHarvest: Harvest;

    // From the top left of the matrix
    private dogPosition: number[];

    // whether a "move" socket event is currently pending, prevents duplicate events from being issued
    private movePending: boolean;

    // kick dirt particle effect
    private kickDirtParticles: Phaser.GameObjects.Particles.ParticleEmitterManager;

    // sounds
    private walkSound: Phaser.Sound.BaseSound;
    private peeSound: Phaser.Sound.BaseSound;
    private kickDirtSound: Phaser.Sound.BaseSound;
    private compostSound: Phaser.Sound.BaseSound;

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
        this.dogPosition = [...GameManager.getInstance().dogPosition];
        this.dog = new Dog({ scene: this.scene, tileX: this.dogPosition[0], tileY: this.dogPosition[1], id: GameManager.getInstance().dogId });
        this.scene.add.existing(this.dog);
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
        this.compostSound = this.scene.sound.add('compost', {volume: 0.4});
    }

    update() {
        if (this.left && this.left.isDown) {
            this.moveDogLeft();
        }
        if (this.right && this.right.isDown) {
            this.moveDogRight();
        }
        if (this.up && this.up.isDown) {
            this.moveDogUp();
        }
        if (this.down && this.down.isDown) {
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
            this.lookAt(x, y);
            return;
        }
        this.dogPosition = [x, y];
        this.doMove();
    }

    private doMove() {
        this.walkSound.play();
        this.dog.moveTo(this.dogPosition[0], this.dogPosition[1], true);
        GameManager.getInstance().dogPosition = [...this.dogPosition];
    }

    private lookAt(x: number, y: number) {
        this.dog.lookAt(x, y);
    }

    private canMove(x: number, y: number): boolean {
        if (!this.dog.canMove()) {
            return false;
        }
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
        if (!this.dog.canPee()) {
            return;
        }
        this.peeSound.play();
        this.dog.pee();
        GameManager.getInstance().peeOnPlant();
    }

    private kickDirt() {
        if (!this.dog.canKickDirt()) {
            return;
        }
        // play sound
        this.kickDirtSound.play();
        // play animation
        this.dog.kickDirt();
        // play particle effect
        /*
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
        */
        // tell game manager we're kicking dirt on the plant underneath us
        GameManager.getInstance().kickDirtOnPlant();
    }

    public setHoldingPlant(plant: Plant) {
        this.pickupHarvest(new Harvest(this.scene, this.dogPosition[0], this.dogPosition[1], plant));
    }

    public pickupHarvest(harvest: Harvest) {
        this.heldHarvest = harvest;
        this.scene.add.existing(this.heldHarvest);
        this.heldHarvest.setActive(true);
        this.heldHarvest.holdMe(this.dog);
    }
    
    /**
     * Destroys the harvest, bye bye.
     */
    public compostHarvest() {
        this.compostingHarvest = this.heldHarvest;
        this.heldHarvest = null;
        this.compostingHarvest.dropMe();
        this.scene.tweens.add({
            targets: this.compostingHarvest,
            x: Math.random() * (4 * TILE_SIZE - 2 * TILE_SIZE) + 2 * TILE_SIZE, // random spot in the middle of the compost
            y: Math.random() * (8 * TILE_SIZE - 7 * TILE_SIZE) + 7 * TILE_SIZE, // random spot in the middle of the compost
            rotation: -0.3,
            scale: 0.6,
            duration: 275,
            onComplete: () => {
                this.compostSound.play();
                this.scene.tweens.add({
                    targets: this.compostingHarvest,
                    alpha: 0,
                    delay: 350,
                    duration: 600,
                    onComplete: () => {
                        this.compostingHarvest.destroy();
                    }
                });
            }
        });
    }

    /**
     * Just drops the harvest, no destroy.
     */
    public dropHarvest() {
        this.heldHarvest.dropMe();
        this.heldHarvest.setActive(false);
        this.heldHarvest = null;
    }

    public testWord() {
        this.dog.testWord();
    }
}
