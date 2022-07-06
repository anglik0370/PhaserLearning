import Phaser from 'phaser'
import { GameScene } from "./gameScene";
 
const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 640,
  height: 320,
  scene: GameScene
};
 
new Phaser.Game(config);