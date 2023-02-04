import { BOARD_POS, ROOT_TYPE } from "../constants";
import { Obstacle } from "./obstacles/Obstacle";

export interface ITicket {
    type: ROOT_TYPE;
}

export class Board extends Obstacle {
    private timer: Phaser.Time.TimerEvent;
    private progress: Phaser.GameObjects.Graphics;
    private remaining: number = 100;

    constructor(scene: Phaser.Scene) {
        super(scene, [7, 2], BOARD_POS, 'orderboard-prefix');
    }

    update(): void {
    }

    public newTicket(ticket: ITicket) {
        this.remove(this.sprite);
        this.sprite.destroy();
        this.sprite = new Phaser.GameObjects.Sprite(this.scene, 0, 0, 'orderboard-prefix').setOrigin(0,0);
        this.add(this.sprite);
        
        this.progress = new Phaser.GameObjects.Graphics(this.scene);
        this.progress.fillStyle(0x0000FF, 1);
        this.progress.fillRect(15, 57, 90, 4);
        this.add(this.progress);

        this.timer = this.scene.time.addEvent({
            callback: () => {
                this.remaining = this.remaining - 10;
                let percent = (this.remaining / 100);
                this.progress.clear();
                this.progress.fillStyle(0x0000FF, 1);
                this.progress.fillRect(15, 57, 90 * percent, 4);
                if (this.remaining <= 0) {
                    this.failed();
                }
            },
            delay: 3000,
            repeat: -1
        });
    }

    public clear() {
        this.timer && this.timer.destroy();
    }

    public failed() {
        this.timer && this.timer.destroy();
    }

}
