const app = new PIXI.Application({
    height: 480,
    width: 320
});

document.body.appendChild(app.view);

// Loads image with the object/variable 'bunny'
app.loader.add('giraffe', 'images/giraffe-400.png').load((loader, resources) => {
    const giraffe = new PIXI.Sprite(resources.giraffe.texture);

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