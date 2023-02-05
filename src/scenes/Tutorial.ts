import { BACKGROUND_RBG, DISPLAY_SIZE } from '../constants';

const { r, g, b } = BACKGROUND_RBG;
export class Tutorial extends Phaser.Scene {

    private spaceKey: Phaser.Input.Keyboard.Key;

    constructor() {
        super({key: 'Tutorial'});
    }

    preload() {
        this.cameras.main.setBackgroundColor("#FFFFFF");
    }

    init() {
        // TODO: use custom cursor
        //this.input.setDefaultCursor('url(assets/input/cursors/blue.cur), pointer');

        this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }

    create() {
        // load background image
        let bg = this.add.sprite(0, 0, 'tutorial').setOrigin(0, 0);
        bg.displayWidth = DISPLAY_SIZE.width;
        bg.displayHeight = DISPLAY_SIZE.height;

        let mainMenuButton = this.add.text(DISPLAY_SIZE.width * 0.67,DISPLAY_SIZE.height * 0.14,
            'Return to Main Menu',
            {
                fontFamily: 'Ace',
                fontSize: '4rem',
                color: '#FFE016' // yellow
            }
        ).setOrigin(0.5, 0.5);
        mainMenuButton.setInteractive({cursor: 'pointer'});
        mainMenuButton.on('pointerup', () => {
            this.scene.start('MainMenu');
        });
        let mainMenuButtonBorder = this.add.graphics();
        mainMenuButtonBorder.lineStyle(5, 0xFFE016);
        mainMenuButtonBorder.strokeRect(mainMenuButton.x - (mainMenuButton.width / 2) - 10, mainMenuButton.y - (mainMenuButton.height / 2) - 10, mainMenuButton.width + 20, mainMenuButton.height + 20);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(this.spaceKey)) {
            this.scene.start('MainMenu');
        }
    }
}
