import { BACKGROUND_COLOR, BACKGROUND_RBG } from '../../constants';

const { r, g, b } = BACKGROUND_RBG;

export class Company extends Phaser.Scene {

    private awooSound: Phaser.Sound.BaseSound;

    constructor() {
        super({
            key: 'Company'
        });
    }

    preload() {
        this.cameras.main.setBackgroundColor(BACKGROUND_COLOR);
    }

    create() {
        this.awooSound = this.sound.add('awoo', {volume: 0.2});
        this.awooSound.play();

        setTimeout(() => {
            this.add.sprite(this.cameras.main.width / 2, this.cameras.main.height / 2, 'company').setOrigin(0.5, 0.5);
            this.cameras.main.fadeIn(1250, r, g, b);
        }, 500);
        this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_IN_COMPLETE, () => {
            setTimeout(() => {
                this.cameras.main.fadeOut(1250, r, g, b);
            }, 1750);
        });
        this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, () => {
            setTimeout(() => {
                this.awooSound && this.awooSound.stop();
                this.scene.start('PhaserSplash');
            }, 500);
        });
    }
}
