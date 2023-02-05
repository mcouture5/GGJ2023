import { BACKGROUND_RBG, DISPLAY_SIZE } from '../constants';

const { r, g, b } = BACKGROUND_RBG;
export class MainMenu extends Phaser.Scene {
    private text: Phaser.GameObjects.Text;
    constructor() {
        super({
            key: 'MainMenu'
        });
    }

    preload() {
        this.cameras.main.setBackgroundColor("#FFFFFF");
    }

    init() {}

    create() {
        this.text = new Phaser.GameObjects.Text(this, DISPLAY_SIZE.width / 2, DISPLAY_SIZE.height / 2, 'Game over.', {
            fontFamily: 'Ace',
            fontSize: '5rem',
            color: '0x000'
        }).setOrigin(0.5, 0.5);
        this.add.existing(this.text);
    }

    update() {
    }
}
