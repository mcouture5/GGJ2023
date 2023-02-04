import { PREFIX_POS, TILE_SIZE } from '../../constants';
import { Harvest } from '../plants/Harvest';
import { Bucket } from './Bucket';

export class PrefixBucket extends Bucket {

    constructor(scene: Phaser.Scene) {
        super(scene, [1,2], PREFIX_POS, '', 102);
    }

    update(): void {
    }

}
