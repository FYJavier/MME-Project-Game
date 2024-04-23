// Makes images clear
PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;

const app = new PIXI.Application({
    width: 480,
    height: 320
});

const tileSize = 16;
const SCALE = 2;

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
    collision: [
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

function testCollision(worldX, worldY) {
    let mapX = Math.floor(worldX / tileSize / SCALE);
    let mapY = Math.floor(worldY / tileSize / SCALE);
    return map.collision[mapY * map.width + mapX]
}

document.body.appendChild(app.view);

// Loads image with the object/variable 'blob'
app.loader.add('tileset', 'images/tileset-16x16.png')
app.loader.add('character', 'images/character.png')
app.loader.load((loader, resources) => {
    // Selects a 16 by 16 sprite from a tileset with 77 sprites.
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
            new PIXI.Rectangle(i * tileSize, 0, tileSize, tileSize * 2) 
        );
    }

    // Displays a 'blob' as a flask.
    const blob = new PIXI.Sprite(characterFrames[0]);
    blob.scale.x = SCALE;
    blob.scale.y = SCALE;

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

    sky.scale.x = sky.scale.y = SCALE;
    background.scale.x = SCALE;
    background.scale.y = SCALE;
    // Adds the 'sky' as a background.
    app.stage.addChild(sky);
    // Adds the 'background', in this case tileset-16x16.png, over the sky background.
    app.stage.addChild(background);
    // Adds 'blob' to the map
    app.stage.addChild(blob);

    // Character position
    let character = {
        x: 0, y: 0,
        vx: 0, vy: 0 
    };

    // Character gravity
    app.ticker.add(() => {
        blob.x = character.x;
        blob.y = character.y;

        character.vy = character.vy + 1;

        character.x += character.vx;
        
        if (character.vy > 0) {
            for (let i = 0; i < character.vy; i++) {
                let testX1 = character.x;
                let testX2 = character.x + tileSize * SCALE - 1;
                let testY = character.y + tileSize * SCALE * 2;
                if (testCollision(testX1, testY) || testCollision(testX2, testY)) {
                    character.vy = 0;
                    break;
                }
                character.y = character.y + 1; 
            }
        }
        

    });
})

// Logs an error to the console if an error occurs. 
app.loader.onError.add((error) => console.error(error));