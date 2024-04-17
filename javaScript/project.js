const app = new PIXI.Application({
    height: 480,
    width: 320
});

const tileSize = 16;

document.body.appendChild(app.view);

// Loads image with the object/variable 'bunny'
app.loader.add('tileset', 'https://live.staticflickr.com/65535/53658268592_4995140e23_m.jpg').load((loader, resources) => {
    

    let tileTextures = [];
    for (let i = 0; i < 7 * 11; i++) {
        let x = i % 7;
        let y = Math.floor(i / 7);
        tileTextures[i] = new PIXI.Texture(
            resources.tileset.texture, 
            new PIXI.Rectangle(x * tileSize, x * tileSize, tileSize, tileSize)
        );
    }

    const giraffe = new PIXI.Sprite(tileTextures[55]);

    // Sets position of image
    giraffe.x = app.renderer.width / 2;
    giraffe.y = app.renderer.height / 2;

    // Rotates image around the center
    giraffe.anchor.x = 0.5;
    giraffe.anchor.y = 0.5;

    app.stage.addChild(giraffe);

    app.ticker.add(() => {
        giraffe.rotation += 0.01;
    });
})

// Logs an error to the console if an error occurs. 
app.loader.onError.add((error) => console.error(error));