import { BACKGROUND_RBG, DISPLAY_SIZE } from '../constants';

const { r, g, b } = BACKGROUND_RBG;
export class Credits extends Phaser.Scene {

    constructor() {
        super({key: 'Credits'});
    }

    preload() {
        this.cameras.main.setBackgroundColor("#FFFFFF");
    }

    init() {
        // TODO: use custom cursor
        //this.input.setDefaultCursor('url(assets/input/cursors/blue.cur), pointer');
    }

    create() {
        this.add.text(DISPLAY_SIZE.width / 2,DISPLAY_SIZE.height / 2,
            'CREDITS',
            {
                fontFamily: 'Ace',
                fontSize: '5rem',
                color: '#000' // black
            }
        ).setOrigin(0.5, 0.5);

        // load background image
        /*
        let bg = this.add.sprite(0, 0, 'tutorial').setOrigin(0, 0);
        bg.displayWidth = DISPLAY_SIZE.width;
        bg.displayHeight = DISPLAY_SIZE.height;
        */

        /*
        let playButton = this.add.rectangle(235, 735, 360, 155, 0xFF0000, 0).setOrigin(0,0);
        playButton.setInteractive({cursor: 'pointer'});
        playButton.on('pointerup', () => {
            this.scene.start('DogSelection');
        });
        let tutorialButton = this.add.rectangle(675, 735, 543, 155, 0xFF0000, 0).setOrigin(0,0);
        tutorialButton.setInteractive({cursor: 'pointer'});
        tutorialButton.on('pointerup', () => {
            this.scene.start('Tutorial');
        });
        let creditsButton = this.add.rectangle(1297, 735, 440, 155, 0xFF0000, 0).setOrigin(0,0);
        creditsButton.setInteractive({cursor: 'pointer'});
        creditsButton.on('pointerup', () => {
            this.scene.start('Tutorial');
        });
        */
    }

    update() {
    }
}
