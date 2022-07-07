export class PreloadAssets extends Phaser.Scene {

    constructor(){
        super({
            key: 'PreloadAssets'
        });
    }

    preload(): void {
        this.load.json('words', 'assets/word.json');
    }

    create() : void {
        this.scene.start('PlayGame');
    }
}