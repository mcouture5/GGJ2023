import { BACKGROUND_RBG, DISPLAY_SIZE, GOAL, TILE_SIZE } from '../constants';
import { GameManager } from '../GameManager';
import { DogLayer } from '../layers/DogLayer';
import { FarmLayer } from '../layers/FarmLayer';
import { PlantLayer } from '../layers/PlantLayer';

export class GameScene extends Phaser.Scene {

    // Layers
    private farmLayer: FarmLayer;
    private plantLayer: PlantLayer;
    private dogLayer: DogLayer;

    // sounds
    private music: Phaser.Sound.BaseSound;

    // Starting board timer
    private boardStartTimer: Phaser.Time.TimerEvent;

    // Wallet
    private walletText: Phaser.GameObjects.Text;
    private previousWallet: number = 0;

    private progress: Phaser.GameObjects.Graphics;
    private magicParticles: Phaser.GameObjects.Particles.ParticleEmitterManager;

    // foodmeter
    private previousDrink: number;
    private drinkText: Phaser.GameObjects.Text;
    private previousFood: number;
    private foodText: Phaser.GameObjects.Text;
    private drinkProgress: Phaser.GameObjects.Graphics;
    private foodProgress: Phaser.GameObjects.Graphics;

    constructor() {
        super({
            key: 'GameScene'
        });
    }

    init() {
        // set up the global animations
        //=====
        // LAB
        //=====
        this.anims.create({
            key: 'lab-idle',
            frames: this.anims.generateFrameNumbers('lab-walk', { frames: [0] }),
            frameRate: 30,
            repeat: -1
        });
        this.anims.create({
            key: 'lab-walk',
            frames: this.anims.generateFrameNumbers('lab-walk', { start: 0, end: 7 }),
            frameRate: 30,
            repeat: -1
        });
        this.anims.create({
            key: 'lab-pee',
            frames: this.anims.generateFrameNumbers('lab-pee', { start: 5, end: 15 }),
            frameRate: 30,
            repeat: 0
        });
        this.anims.create({
            key: 'lab-kick',
            frames: this.anims.generateFrameNumbers('lab-kick', { start: 0, end: 14 }),
            frameRate: 30,
            repeat: 0
        });
        this.anims.create({
            key: 'lab-idle-carry',
            frames: this.anims.generateFrameNumbers('lab-carry', { frames: [0] }),
            frameRate: 30,
            repeat: -1
        });
        this.anims.create({
            key: 'lab-walk-carry',
            frames: this.anims.generateFrameNumbers('lab-carry', { start: 0, end: 7 }),
            frameRate: 30,
            repeat: -1
        });
        this.anims.create({
            key: 'lab-pee-carry',
            frames: this.anims.generateFrameNumbers('lab-pee-carry', { start: 5, end: 15 }),
            frameRate: 30,
            repeat: 0
        });
        this.anims.create({
            key: 'lab-kick-carry',
            frames: this.anims.generateFrameNumbers('lab-kick-carry', { start: 0, end: 14 }),
            frameRate: 30,
            repeat: 0
        });
        //======
        // PHIN
        //======
        this.anims.create({
            key: 'phin-idle',
            frames: this.anims.generateFrameNumbers('phin-walk', { frames: [0] }),
            frameRate: 30,
            repeat: -1
        });
        this.anims.create({
            key: 'phin-walk',
            frames: this.anims.generateFrameNumbers('phin-walk', { start: 0, end: 7 }),
            frameRate: 30,
            repeat: -1
        });
        this.anims.create({
            key: 'phin-pee',
            frames: this.anims.generateFrameNumbers('phin-pee', { start: 5, end: 15 }),
            frameRate: 30,
            repeat: 0
        });
        this.anims.create({
            key: 'phin-kick',
            frames: this.anims.generateFrameNumbers('phin-kick', { start: 0, end: 14 }),
            frameRate: 30,
            repeat: 0
        });
        this.anims.create({
            key: 'phin-idle-carry',
            frames: this.anims.generateFrameNumbers('phin-carry', { frames: [0] }),
            frameRate: 30,
            repeat: -1
        });
        this.anims.create({
            key: 'phin-walk-carry',
            frames: this.anims.generateFrameNumbers('phin-carry', { start: 0, end: 7 }),
            frameRate: 30,
            repeat: -1
        });
        this.anims.create({
            key: 'phin-pee-carry',
            frames: this.anims.generateFrameNumbers('phin-pee-carry', { start: 5, end: 15 }),
            frameRate: 30,
            repeat: 0
        });
        this.anims.create({
            key: 'phin-kick-carry',
            frames: this.anims.generateFrameNumbers('phin-kick-carry', { start: 0, end: 14 }),
            frameRate: 30,
            repeat: 0
        });
        // Coin
        this.anims.create({
            key: 'coin-shine-anim',
            frames: this.anims.generateFrameNumbers('coin-shine', { frames: [0,1,2,3,4,5,6,7,8,9,10,11,0] }),
            frameRate: 24,
            repeat: -1,
            repeatDelay: 2000
        });
        // Memagee
        this.anims.create({
            key: 'memagee-turn',
            frames: this.anims.generateFrameNumbers('memagee', { start: 0, end: 2 }),
            frameRate: 3,
            repeat: 0,
            delay: 700
        });
        this.anims.create({
            key: 'memagee-sweat',
            frames: this.anims.generateFrameNumbers('memagee', { frames: [3,4,3]}),
            frameRate: 3,
            repeat: 0
        });
    }

    create(): void {
        let centerX = DISPLAY_SIZE.width / 2;
        let centerY = DISPLAY_SIZE.height / 2;

        // start playing music if not already playing. fade it in.
        if (!this.music || !this.music.isPlaying) {
            let startVolume: number = 0.1;
            let endVolume: number = 0.2;
            this.music = this.sound.add('ruff-ruff-root', {loop: true, volume: startVolume});
            this.music.play();
            this.add.tween({
                targets: this.music,
                volume: {from: startVolume, to: endVolume},
                ease: 'Linear',
                duration: 1300
            });
        }

        let farm = new Phaser.GameObjects.Sprite(this, centerX, centerY, 'farm');
        this.add.existing(farm);
        
        this.farmLayer = new FarmLayer(this);
        this.add.existing(this.farmLayer);
        this.farmLayer.create();
        GameManager.getInstance().farmLayer = this.farmLayer;
        
        this.plantLayer = new PlantLayer(this);
        this.add.existing(this.plantLayer);
        this.plantLayer.create();
        GameManager.getInstance().plantLayer = this.plantLayer;

        this.dogLayer = new DogLayer(this);
        this.add.existing(this.dogLayer);
        this.dogLayer.create();
        GameManager.getInstance().dogLayer = this.dogLayer;

        let trees = new Phaser.GameObjects.Sprite(this, centerX, centerY, 'trees').setDepth(20);
        this.add.existing(trees);

        this.magicParticles = this.add.particles('magic');
        this.add.existing(this.magicParticles);
        this.magicParticles.createEmitter({
            x: {min: 0, max: DISPLAY_SIZE.width},
            y: {min: 0, max: DISPLAY_SIZE.height},
            bounds: {x: 0, y: 0, width: DISPLAY_SIZE.width, height: DISPLAY_SIZE.height},
            radial: true,
            alpha: 0.6,
            lifespan: [2000, 6000],
            speed: { min: 10, max: 50 },
            angle: { min: 0, max: 360 },
            scale: { start: 0, end: 1, ease: (a) => {
                let val = a;
                if (val >= 0.5) val = 1 - a;
                if (val > 0.25) val = 0.25;
                return val;
            } },
            maxVelocityX: [10, 100],
            maxVelocityY: [10, 100],
            quantity: 1,
            blendMode: Phaser.BlendModes.SKIP_CHECK
        }).flow(300, 1);

        let pointsbar = new Phaser.GameObjects.Sprite(this, 0, 0, 'pointsbar').setOrigin(0,0).setDepth(25);
        this.add.existing(pointsbar);

        let progressbar = new Phaser.GameObjects.Sprite(this, 180, 30, 'progressbar').setOrigin(0,0).setDepth(25);
        this.add.existing(progressbar);

        this.progress = new Phaser.GameObjects.Graphics(this).setDepth(25);
        //this.progress.fillStyle(0xFFFFFF, 0.7);
        //this.progress.fillRect(192, 45, 470, 30);
        this.add.existing(this.progress);

        let coin = new Phaser.GameObjects.Sprite(this, 30, 30, 'coin-shine').setOrigin(0,0).setDepth(25);
        this.add.existing(coin);
        coin.play('coin-shine-anim');
        
        this.walletText = new Phaser.GameObjects.Text(this, 90, 45, '' + GameManager.getInstance().wallet + '', {
            fontFamily: 'Ace',
            fontSize: '2rem',
            color: '0x000'
        }).setOrigin(0, 0).setDepth(30);
        this.add.existing(this.walletText);

        // Start the ticketing system
        this.boardStartTimer = this.time.addEvent({
            callback: () => {
                GameManager.getInstance().beginTickets();
            },
            delay: 3000,
            repeat: 0
        });

        // create foodmeter stuff
        let foodmeter = new Phaser.GameObjects.Sprite(this, 1200, 960, 'foodmeter').setOrigin(0,0).setDepth(25);
        this.add.existing(foodmeter);
        this.drinkText = new Phaser.GameObjects.Text(this, 1284, 1005, GameManager.getInstance().drink + '', {
            fontFamily: 'Ace',
            fontSize: '1.6rem',
            color: '#000000', // black
            backgroundColor: '#CDCDCD' // off-white
        }).setOrigin(0, 0).setDepth(30);
        this.add.existing(this.drinkText);
        let foodTextBackground = new Phaser.GameObjects.Graphics(this).setDepth(25);
        foodTextBackground.fillStyle(0xCDCDCD); // off-white
        foodTextBackground.fillRect(1635, 1005, 24, 24);
        this.add.existing(foodTextBackground);
        this.foodText = new Phaser.GameObjects.Text(this, 1640, 1005, GameManager.getInstance().food + '', {
            fontFamily: 'Ace',
            fontSize: '1.6rem',
            color: '#000000', // black
            backgroundColor: '#CDCDCD' // off-white
        }).setOrigin(0, 0).setDepth(30);
        this.add.existing(this.foodText);
        this.foodProgress = new Phaser.GameObjects.Graphics(this).setDepth(25);
        this.add.existing(this.foodProgress);
        this.drinkProgress = new Phaser.GameObjects.Graphics(this).setDepth(25);
        this.add.existing(this.drinkProgress);
    }

    update(): void {
        if (GameManager.getInstance().gameOver) {
            this.music && this.music.stop();
            this.scene.start('GameOver');
        }
        this.farmLayer.update();
        this.dogLayer.update();
        this.walletText.setText(GameManager.getInstance().wallet + '');
        if (this.previousWallet !== GameManager.getInstance().wallet) {
            this.updateProgress();
            this.previousWallet = GameManager.getInstance().wallet;
        }

        // update foodmeter
        this.drinkText.setText(GameManager.getInstance().drink + '');
        if (this.previousDrink !== GameManager.getInstance().drink) {
            this.updateDrinkProgress();
            this.previousDrink = GameManager.getInstance().drink;
        }
        this.foodText.setText(GameManager.getInstance().food + '');
        if (this.previousFood !== GameManager.getInstance().food) {
            this.updateFoodProgress();
            this.previousFood = GameManager.getInstance().food;
        }
    }

    private updateProgress() {
        this.progress.clear();
        this.progress.fillStyle(0xFFFFFF, 0.7);
        this.progress.fillRect(192, 45, 470 * (GameManager.getInstance().wallet / GOAL), 30);
    }

    private updateDrinkProgress() {
        this.drinkProgress.clear();
        this.drinkProgress.fillStyle(0xFFFFFF, 0.7);
        this.drinkProgress.fillRect(1322, 1005, 220 * (GameManager.getInstance().drink / GameManager.getInstance().maxDrink), 30);
    }

    private updateFoodProgress() {
        this.foodProgress.clear();
        this.foodProgress.fillStyle(0xFFFFFF, 0.7);
        this.foodProgress.fillRect(1680, 1005, 220 * (GameManager.getInstance().food / GameManager.getInstance().maxFood), 30);
    }
}
