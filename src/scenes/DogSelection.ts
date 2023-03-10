import { BACKGROUND_RBG, DISPLAY_SIZE } from '../constants';
import { GameManager } from '../GameManager';

const { r, g, b } = BACKGROUND_RBG;
export class DogSelection extends Phaser.Scene {
    private text: Phaser.GameObjects.Text;
    private lab: Phaser.GameObjects.Sprite;
    private phin: Phaser.GameObjects.Sprite;

    private left: Phaser.Input.Keyboard.Key;
    private right: Phaser.Input.Keyboard.Key;
    private space: Phaser.Input.Keyboard.Key;

    private selectedDogId: number = 0;
    private transitioning: boolean = false;

    private selectionRing: Phaser.GameObjects.Graphics;
    constructor() {
        super({
            key: 'DogSelection'
        });
    }

    preload() {
        this.cameras.main.setBackgroundColor("#f8f6f2");
    }

    init() {
        this.transitioning = false;
        this.anims.create({
            key: 'lab_idle_selection',
            frames: this.anims.generateFrameNumbers('lab-idle-selection', { frames: [0] }),
            repeat: 0
        });
        this.anims.create({
            key: 'lab_selected',
            frames: this.anims.generateFrameNumbers('lab-idle-selection', { frames: [0, 1, 2] }),
            frameRate: 7,
            repeat: -1
        });
        this.anims.create({
            key: 'phin_idle_selection',
            frames: this.anims.generateFrameNumbers('phin-idle-selection', { frames: [0] }),
            repeat: 0
        });
        this.anims.create({
            key: 'phin_selected',
            frames: this.anims.generateFrameNumbers('phin-idle-selection', { frames: [0, 1, 2] }),
            frameRate: 7,
            repeat: -1
        });
    }

    create() {
        this.left = this.input.keyboard.addKey(
            Phaser.Input.Keyboard.KeyCodes.LEFT
        );
        this.right = this.input.keyboard.addKey(
            Phaser.Input.Keyboard.KeyCodes.RIGHT
        );
        this.space = this.input.keyboard.addKey(
            Phaser.Input.Keyboard.KeyCodes.SPACE
        );

        this.add.sprite(0, 0, 'pickafarmer').setOrigin(0, 0);

        this.lab = new Phaser.GameObjects.Sprite(this, DISPLAY_SIZE.width / 3, 530, 'lab-idle-selection')
            .setOrigin(0.5, 0.5);
        this.add.existing(this.lab);

        this.phin = new Phaser.GameObjects.Sprite(this, 1320, 530, 'phin-idle-selection')
            .setOrigin(0.5, 0.5);
        this.add.existing(this.phin);

        this.selectionRing = this.add.graphics();
        this.selectionRing.lineStyle(14, 0xFFFFFF, 0.75);
        this.selectionRing.strokeRoundedRect(420, 250, 448, 750, 2);

        this.text = new Phaser.GameObjects.Text(this, DISPLAY_SIZE.width / 2, 217, 'Use left/right keys to select. Space to confirm.', {
            fontFamily: 'Ace',
            fontSize: '2.5rem',
            color: '0x000'
        }).setOrigin(0.5, 0.5);
        this.add.existing(this.text);

        this.selectLab();
    }

    update() {
        if (this.transitioning) return;
        if (this.left && Phaser.Input.Keyboard.JustDown(this.left)) {
            this.selectLab();
        }
        if (this.right && Phaser.Input.Keyboard.JustDown(this.right)) {
            this.selectPhin();
        }
        if (this.space && Phaser.Input.Keyboard.JustDown(this.space)) {
            this.beginGame();
        }
    }

    private selectLab() {
        this.phin.play('phin_idle_selection', true);
        this.lab.play('lab_selected', true);
        this.selectedDogId = 0;
        this.selectionRing.clear();
        this.selectionRing.lineStyle(14, 0xFFFFFF, 0.75);
        this.selectionRing.strokeRoundedRect(417, 246, 456, 760, 2);

    }

    private selectPhin() {
        this.lab.play('lab_idle_selection', true);
        this.phin.play('phin_selected', true);
        this.selectedDogId = 1;
        this.selectionRing.clear();
        this.selectionRing.lineStyle(14, 0xFFFFFF, 0.75);
        this.selectionRing.strokeRoundedRect(1085, 246, 456, 760, 2);

    }

    private beginGame() {
        if (this.selectedDogId === -1 || this.transitioning) return;
        this.transitioning = true;
        GameManager.getInstance().dogId = this.selectedDogId;
        this.cameras.main.fadeOut(1250, r, g, b);
        this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, () => {
            setTimeout(() => {
                this.scene.start('GameScene');
            }, 500);
        });
    }
}
