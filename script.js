

var playerVelocity = 100;
var config = {        
    type: Phaser.AUTO,
    width: 800,
    height: 600,
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
    
    this.load.image('car', 'Car.png');    
    this.load.spritesheet('player', 
        'character.png',
        { frameWidth: 32, frameHeight: 48 }
    );  
}
function create(){
    player= this.physics.add.sprite(100, 100, 'player');
    
    player.setBounce(0);
    player.setGravity((0,0));
    
    player.setCollideWorldBounds(true);

    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('player', { start: 4, end: 7 }),
        frameRate: 10,
        repeat: -1
    });
    this.anims.create({
        key: 'up',
        frames: this.anims.generateFrameNumbers('player', { start: 12, end: 15 }),
        frameRate: 10,
        repeat: -1
    });
    this.anims.create({
        key: 'down',
        frames: this.anims.generateFrameNumbers('player', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
    });
    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('player', { start: 8, end: 11 }),
        frameRate: 10,
        repeat: -1
    });
     
} 
function update(){
    cursors = this.input.keyboard.createCursorKeys();
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