import { BACKGROUND_RBG, DISPLAY_SIZE, TILE_SIZE } from '../constants';
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

    constructor() {
        super({
            key: 'GameScene'
        });
    }

    init() {
        // set up the global animations
        this.anims.create({
            key: 'lab-walk',
            frames: this.anims.generateFrameNumbers('lab-walk', { start: 0, end: 7 }),
            frameRate: 30,
            repeat: -1
        });
        this.anims.create({
            key: 'lab-idle',
            frames: this.anims.generateFrameNumbers('lab-walk', { frames: [0] }),
            frameRate: 8,
            repeat: -1
        });
        this.anims.create({
            key: 'phin-walk',
            frames: this.anims.generateFrameNumbers('phin-walk', { start: 0, end: 7 }),
            frameRate: 30,
            repeat: -1
        });
        this.anims.create({
            key: 'phin-idle',
            frames: this.anims.generateFrameNumbers('phin-walk', { frames: [0] }),
            frameRate: 8,
            repeat: -1
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

        this.walletText = new Phaser.GameObjects.Text(this, 50, 45, '' + GameManager.getInstance().wallet + '', {
            fontFamily: 'Digital',
            fontSize: '2rem',
            color: '#00FF00'
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
    }

    update(): void {
        this.farmLayer.update();
        this.dogLayer.update();
        this.walletText.setText(GameManager.getInstance().wallet + '');
    }
}