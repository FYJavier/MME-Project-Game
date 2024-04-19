// Makes images clear
PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;

const app = new PIXI.Application({
    width: 480,
    height: 320
});

const tileSize = 16;

let map = {
    width: 16,
    height: 10,
    tiles: [
        12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12,
        12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12,
        12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12,
        12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12,
        12, 12, 23, 12, 12, 12, 3, 4, 4, 5, 12, 12, 12, 12, 12, 12,
        12, 12, 30, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12,
        12, 12, 30, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12,
        12, 12, 37, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12,
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8,
    ],
    collisions: [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 
    ]
}

document.body.appendChild(app.view);

app.loader.add("character", "https://live.staticflickr.com/65535/53663762504_532a8abc0e_m.jpg")
// Loads image with the object/variable 'blob'
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

    let characterFrames = [];
    for (let i = 0; i < 8; i++) {
        characterFrames[i] = new PIXI.Texture(
            resources.character.texture,
            new PIXI.Rectangle(i * tileSize, 0, tileSize, tileSize = 2)
        );
    }

    // Displays a 'blob' as a flask.
    const blob = new PIXI.Sprite(characterFrames[0]);
    blob.scale.x = 2;
    blob.scale.y = 2;
    
    // Sets position of 'blob'
    blob.x = app.renderer.width / 2;
    blob.y = app.renderer.height / 2;

    let sky = new PIXI.TilingSprite(tileTextures[74], map.width * tileSize, map.height * tileSize);

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

    sky.scale.x = sky.scale.y = 2;
    background.scale.x = 2;
    background.scale.y = 2;
    // Adds the 'sky' as a background.
    app.stage.addChild(sky);
    // Adds the 'background', in this case tileset-16x16.png, over the sky background.
    app.stage.addChild(background);
    // Adds 'blob' to the map
    app.stage.addChild(blob);

    app.ticker.add(() => {
    });
})

// Logs an error to the console if an error occurs. 
app.loader.onError.add((error) => console.error(error));