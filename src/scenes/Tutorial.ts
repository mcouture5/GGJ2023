import {BACKGROUND_COLOR, BACKGROUND_RBG, DISPLAY_SIZE} from '../constants';

const { r, g, b } = BACKGROUND_RBG;
export class Tutorial extends Phaser.Scene {

    private spaceKey: Phaser.Input.Keyboard.Key;

    constructor() {
        super({key: 'Tutorial'});
    }

    preload() {
        this.cameras.main.setBackgroundColor(BACKGROUND_COLOR);
    }

    init() {
        // TODO: use custom cursor
        //this.input.setDefaultCursor('url(assets/input/cursors/blue.cur), pointer');

        this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }

    create() {
        // fade in camera
        this.cameras.main.fadeIn(1250, r, g, b);

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
            this.fadeBackToMainMenu();
        });
        let mainMenuButtonBorder = this.add.graphics();
        mainMenuButtonBorder.lineStyle(5, 0xFFE016);
        mainMenuButtonBorder.strokeRect(mainMenuButton.x - (mainMenuButton.width / 2) - 10, mainMenuButton.y - (mainMenuButton.height / 2) - 10, mainMenuButton.width + 20, mainMenuButton.height + 20);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(this.spaceKey)) {
            this.fadeBackToMainMenu();
        }
    }

    private fadeBackToMainMenu() {
        // fade out camera
        this.cameras.main.fadeOut(1250, r, g, b);
        // once fade out is complete...
        this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, () => {
            // switch back to main menu
            this.scene.start('MainMenu');
        });
    }
}
