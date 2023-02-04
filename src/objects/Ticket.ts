import { ROOT_TYPE, TILE_SIZE } from "../constants";

export interface ITicket {
    type: ROOT_TYPE;
}

export class Ticket extends Phaser.GameObjects.Container {
    private sprite: Phaser.GameObjects.Sprite;

    constructor(scene: Phaser.Scene, info: ITicket) {
        super(scene, 7 * TILE_SIZE + 60, 2 * TILE_SIZE + 60);
        this.sprite = new Phaser.GameObjects.Sprite(this.scene, 0, 0, 'ticket').setOrigin(0.5,0.5).setScale(0,0);
        this.add(this.sprite);
    }

    update(): void {
    }

    public activate() {
        this.scene.tweens.add({
            targets: this.sprite,
            scale: 1.35,
            duration: 350,
            delay: 250,
            onComplete: () => {
                this.scene.tweens.add({
                    targets: this.sprite,
                    scale: 1,
                    duration: 150,
                    onComplete: () => {
                        this.beginTimer();
                    }
                });
            }
        });
    }

    private beginTimer() {
        console.log('TIMER START');
        this.failed();
    }

    /**
     * Close the ticket as complete.
     */
    public close() {

    }

    public failed() {
        this.sprite.setOrigin(0,0);
        this.sprite.setX(this.sprite.x - 60);
        this.sprite.setY(this.sprite.y - 60);
        this.scene.tweens.add({
            targets: this.sprite,
            rotation: 1,
            duration: 250,
            ease: Phaser.Math.Easing.Quadratic.Out,
            onComplete: () => {
                this.scene.tweens.add({
                    targets: this.sprite,
                    rotation: 0.59,
                    duration: 150,
                    ease: Phaser.Math.Easing.Quadratic.In,
                    onComplete: () => {
                        this.scene.tweens.add({
                            targets: this.sprite,
                            scale: 0,
                            y: this.sprite.y + 120,
                            duration: 650,
                            delay: 350,
                            onComplete: () => {
                                this.destroy();
                            }
                        });
                    }
                });
            }
        });
    }
}
