import { BACKGROUND_RBG, DISPLAY_SIZE } from '../constants';

const { r, g, b } = BACKGROUND_RBG;
export class MainMenu extends Phaser.Scene {
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
    }

    update() {
    }
}
