var playerVelocity = 150;
var score = 0;
var scoreText;
var config = {        
    type: Phaser.AUTO,
    width: 1280,
    height: 960,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    scene: {preload: preload,  
            create: create,   
            update: update    
        }
    };
var game= new Phaser.Game(config)

function preload(){   
    this.load.spritesheet('player', 
        'character.png',
        { frameWidth: 32, frameHeight: 48 }
    );  
    this.load.image("ground", "nicetiles.png");
    this.load.image("star", "star.png");
    this.load.image("tiles", "nicetiles.png");
    this.load.tilemapTiledJSON("map", "nicemap.json");
}

function collectStar (player, star){
    star.disableBody(true, true);
    score = score + 1
    scoreText.setText('Score: ' + score);
    
}

function create(){

    map = this.make.tilemap({ key: "map", tileWidth: 64, tileHeight: 64});
    tileset = map.addTilesetImage("nicetiles","tiles");
    layer = map.createLayer("TileLayer1", tileset, 0, 0);
    
    
    player= this.physics.add.sprite(100, 100, 'player');

    // stars = this.physics.add.group({
    //     key: 'star',
    //     repeat: 50,
    //     setXY: { x: Phaser.Math.RND.between(0, 800), 
    //              y: Phaser.Math.RND.between(0, 600), 
    //              stepX: 50, stepY: 75 }
    // });

    stars1 = this.physics.add.group({
        key: 'star',
        repeat: 5,
    });

    stars2 = this.physics.add.group({
        key: 'star',
        repeat: 5,
    });

    stars3 = this.physics.add.group({
        key: 'star',
        repeat: 5,
    });
    
    stars4 = this.physics.add.group({
        key: 'star',
        repeat: 5,
    });

    var rect = new Phaser.Geom.Rectangle(20, 20,556 ,  236);
    Phaser.Actions.RandomRectangle(stars1.getChildren(), rect);

    rect = new Phaser.Geom.Rectangle(0, 368,556 ,  236);
    Phaser.Actions.RandomRectangle(stars2.getChildren(), rect);
    
    rect = new Phaser.Geom.Rectangle(11 * 64  +20, 368,556 ,  236);
    Phaser.Actions.RandomRectangle(stars3.getChildren(), rect);
    
    rect = new Phaser.Geom.Rectangle(11 * 64  +20, 20,556 ,  236);
    Phaser.Actions.RandomRectangle(stars4.getChildren(), rect);

    this.physics.add.overlap(player, stars1, collectStar, null, this);
    this.physics.add.overlap(player, stars2, collectStar, null, this);
    this.physics.add.overlap(player, stars3, collectStar, null, this);
    this.physics.add.overlap(player, stars4, collectStar, null, this);


    scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#000' });
    this.physics.add.collider(player, layer);
    layer.setCollisionBetween(2, 2);

    player.setBounce(0);
    player.setGravity((0,0));

    
    

    player.setCollideWorldBounds(true);

    playerAnimations();
     
} 

function playerAnimations(){
    game.anims.create({
        key: 'left',
        frames: game.anims.generateFrameNumbers('player', { start: 4, end: 7 }),
        frameRate: 10,
        repeat: -1
    });
    game.anims.create({
        key: 'up',
        frames: game.anims.generateFrameNumbers('player', { start: 12, end: 15 }),
        frameRate: 10,
        repeat: -1
    });
    game.anims.create({
        key: 'down',
        frames: game.anims.generateFrameNumbers('player', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
    });
    game.anims.create({
        key: 'right',
        frames: game.anims.generateFrameNumbers('player', { start: 8, end: 11 }),
        frameRate: 10,
        repeat: -1
    });
}

function playerMovement() {
        
    if (cursors.left.isDown){
        player.setVelocityX(-playerVelocity);
        player.anims.play('left', true);
    } else{
        player.setVelocityX(0);
    }
    if (cursors.right.isDown){
        player.setVelocityX(+playerVelocity);
        player.anims.play('right', true);
    }else{
        player.setVelocityY(0);
    }
    if (cursors.up.isDown){
        player.setVelocityY(-playerVelocity);
        player.anims.play('up', true);
    }
    if (cursors.down.isDown){
        player.setVelocityY(+playerVelocity);
        player.anims.play('down', true);
    }
}

function update(){
    cursors = this.input.keyboard.createCursorKeys();
    playerMovement();

}