import { BOARD_POS, PREFIXABLES, ROOT_TYPE } from "../constants";
import { GameManager } from "../GameManager";
import { Obstacle } from "./obstacles/Obstacle";

export interface ITicket {
    type: ROOT_TYPE;
    time: number;
    cost: number;
}

export class Board extends Obstacle {
    private timer: Phaser.Time.TimerEvent;
    private progress: Phaser.GameObjects.Graphics;
    private remaining: number = 100;
    private nextTicketTimer: Phaser.Time.TimerEvent;

    constructor(scene: Phaser.Scene) {
        super(scene, [6, 2], BOARD_POS, 'orderboard-empty');
        this.sprite.setOrigin(0.5,0.5).setScale(1.5,1.5).setX(160).setY(30);
    }

    update(): void {
    }

    public newTicket(ticket: ITicket) {
        this.remove(this.sprite);
        this.sprite.destroy();
        let key  = 'orderboard-empty';
        switch (ticket.type) {
            case ROOT_TYPE.PREFIXABLE:
                key = 'orderboard-prefix';
                break;
            case ROOT_TYPE.SUFFIXABLE:
                key = 'orderboard-suffix';
                break;
            case ROOT_TYPE.BOTHABLE:
                key = 'orderboard-all';
                break;
        }
        this.sprite = new Phaser.GameObjects.Sprite(this.scene, 160, 30, key).setOrigin(0.5,0.5).setScale(1.5,1.5);
        this.add(this.sprite);
        
        this.progress = new Phaser.GameObjects.Graphics(this.scene);
        this.progress.fillStyle(0x0000FF, 1);
        this.progress.fillRect(93, 26, 135, 6);
        this.add(this.progress);

        this.remaining = ticket.time;
        this.timer = this.scene.time.addEvent({
            callback: () => {
                this.remaining = this.remaining - 10;
                let percent = (this.remaining / ticket.time);
                this.progress.clear();
                this.progress.fillStyle(0x0000FF, 1);
                this.progress.fillRect(93, 26, 135 * percent, 6);
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
        this.remove(this.sprite);
        this.sprite.destroy();
        this.sprite = new Phaser.GameObjects.Sprite(this.scene, 160, 30, 'orderboard-empty').setOrigin(0.5,0.5).setScale(1.5,1.5);
        this.add(this.sprite);
    }

    public failed() {
        this.clear();
        GameManager.getInstance().ticketFailed();
        this.nextTicketTimer = this.scene.time.addEvent({
            callback: () => {
                GameManager.getInstance().nextTicket();
            },
            delay: 3000,
            repeat: 0
        });
    }

}
