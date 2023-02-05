import { BACKGROUND_RBG, DISPLAY_SIZE } from '../constants';
import { GameManager } from '../GameManager';

const { r, g, b } = BACKGROUND_RBG;
export class GameOver extends Phaser.Scene {

    private spaceKey: Phaser.Input.Keyboard.Key;

    // sounds
    private awooSound: Phaser.Sound.BaseSound;

    constructor() {
        super({key: 'GameOver'});
    }

    preload() {
        this.cameras.main.setBackgroundColor("#f8f6f2"); // off-white
    }

    init() {
        this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }

    create() {
        this.awooSound = this.sound.add('awoo', {volume: 0.2});
        this.awooSound.play();

        this.add.text(DISPLAY_SIZE.width / 2,DISPLAY_SIZE.height * 0.4,
            'You won! You saved the family farm!',
            {
                fontFamily: 'Ace',
                fontSize: '5rem',
                color: '#000' // black
            }
        ).setOrigin(0.5, 0.5);
        this.add.text(DISPLAY_SIZE.width / 2,DISPLAY_SIZE.height * 0.6,
            'Press Space to return to the menu',
            {
                fontFamily: 'Ace',
                fontSize: '3rem',
                color: '#000' // black
            }
        ).setOrigin(0.5, 0.5);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(this.spaceKey)) {
            this.awooSound && this.awooSound.stop();
            this.scene.start('MainMenu');
        }
    }
}
