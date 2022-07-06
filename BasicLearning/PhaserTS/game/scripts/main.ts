import Pahser from 'phaser';
import { GameScene } from './gameScene';

const config: Pahser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    width: 640,
    height: 320,
    scene: GameScene
};

new Pahser.Game(config);