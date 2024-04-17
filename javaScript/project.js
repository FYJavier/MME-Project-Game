// Makes images clear
PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;

const app = new PIXI.Application({
    height: 480,
    width: 320
});

const tileSize = 16;

let map = {
    width: 16,
    height: 9,
    tiles: [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ]
}

document.body.appendChild(app.view);

// Loads image with the object/variable 'bunny'
app.loader.add('tileset', 'images/tileset-16x16.png').load((loader, resources) => {
    
    // Selects tiles on a 16 by 16 tileset.
    let tileTextures = [];
    for (let i = 0; i < 7 * 11; i++) {
        let x = i % 7;
        let y = Math.floor(i / 7);
        tileTextures[i] = new PIXI.Texture(
            resources.tileset.texture,
            new PIXI.Rectangle(x * tileSize, y * tileSize, tileSize, tileSize)
        );
    }

    // Displays a tile depending on number in brackets.
    const giraffe = new PIXI.Sprite(tileTextures[56]);
    giraffe.scale.x = 4;
    giraffe.scale.y = 4;
    
    // Sets position of image
    giraffe.x = app.renderer.width / 2;
    giraffe.y = app.renderer.height / 2;

    // Rotates image around the center
    giraffe.anchor.x = 0.5;
    giraffe.anchor.y = 0.5;

    let background = new PIXI.Container();
    for (let y = 0; y < map.width; y++) {
        for (let x = 0; x < map.width; x++) {
            let tile = map.tiles[y * map.width + x];
            let sprite = new PIXI.Sprite(tileTextures[tile]);
            sprite.x = x * tileSize;
            sprite.y = y * tileSize;
            background.addChild(sprite);
        }
    }

    background.scale.x = 2;
    background.scale.y = 2;
    // Adds an image, in this case tileset-16x16.png, to the background
    app.stage.addChild(background);

    app.ticker.add(() => {
        giraffe.rotation += 0.01;
    });
})

// Logs an error to the console if an error occurs. 
app.loader.onError.add((error) => console.error(error));