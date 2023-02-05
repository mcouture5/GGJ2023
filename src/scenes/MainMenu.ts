import { BACKGROUND_RBG, DISPLAY_SIZE } from '../constants';

const { r, g, b } = BACKGROUND_RBG;
export class MainMenu extends Phaser.Scene {

    private mainMenuSong: Phaser.Sound.BaseSound;

    constructor() {
        super({
            key: 'MainMenu'
        });
    }

    preload() {
        this.cameras.main.setBackgroundColor("#FFFFFF");
    }

    init() {
        // TODO: use custom cursor
        //this.input.setDefaultCursor('url(assets/input/cursors/blue.cur), pointer');
    }

    create() {
        // start playing music if not already playing. fade it in.
        if (!this.mainMenuSong || !this.mainMenuSong.isPlaying) {
            let startVolume: number = 0.05;
            let endVolume: number = 0.1;
            this.mainMenuSong = this.sound.add('main-menu', {loop: true, volume: startVolume});
            this.mainMenuSong.play();
            this.add.tween({
                targets: this.mainMenuSong,
                volume: {from: startVolume, to: endVolume},
                ease: 'Linear',
                duration: 1300
            });
        }

        // load background image
        let bg = this.add.sprite(0, 0, 'main-menu').setOrigin(0, 0);
        bg.displayWidth = DISPLAY_SIZE.width;
        bg.displayHeight = DISPLAY_SIZE.height;

        let playButton = this.add.rectangle(235, 735, 360, 155, 0xFF0000, 0).setOrigin(0,0);
        playButton.setInteractive({cursor: 'pointer'});
        playButton.on('pointerup', () => {
            this.mainMenuSong.stop();
            this.scene.start('Company');
        });
        let tutorialButton = this.add.rectangle(675, 735, 543, 155, 0xFF0000, 0).setOrigin(0,0);
        tutorialButton.setInteractive({cursor: 'pointer'});
        tutorialButton.on('pointerup', () => {
            this.mainMenuSong.stop();
            this.scene.start('Tutorial');
        });
        let creditsButton = this.add.rectangle(1297, 735, 440, 155, 0xFF0000, 0).setOrigin(0,0);
        creditsButton.setInteractive({cursor: 'pointer'});
        creditsButton.on('pointerup', () => {
            this.mainMenuSong.stop();
            this.scene.start('Credits');
        });
    }

    update() {
    }
}
