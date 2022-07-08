import Phaser from 'phaser';
import { PreloadAssets } from './preloadAssets';
import { PlayGame } from './playGame';

const scaleObject : Phaser.Types.Core.ScaleConfig = {
    mode : Phaser.Scale.FIT,
    autoCenter : Phaser.Scale.CENTER_BOTH,
    parent : 'thegame',
    width : 600,
    height : 280
}

const configObject : Phaser.Types.Core.GameConfig = {
    type : Phaser.AUTO,
    backgroundColor : 0x222222,
    scale : scaleObject,
    scene : [PreloadAssets, PlayGame]
}

new Phaser.Game(configObject);