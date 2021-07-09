var playerVelocity = 150;
var score = 0;
var lives = 3;
var scoreText;
var livesText;
var TaxiX = 1100;
var VelocityCar1 = 400;
var initialTime = 500;
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
    //Player
    this.load.spritesheet('player', 
        'character.png',
        { frameWidth: 32, frameHeight: 48 }
    ); 
    
    //Map 
    this.load.image("tiles", "nicetiles.png");
    this.load.tilemapTiledJSON("map", "nicemap.json");

    //Vehicles
    this.load.image("Audi", "Audi.png");
    this.load.image("Audi2", "Audi2.png");
    this.load.image("MiniTruck", "Mini_truck.png");
    this.load.image("Taxi2", "taxi2.png");
    this.load.image("Taxi", "taxi.png");
    this.load.image("Car", "Car.png");
    this.load.image("Police", "Police.png");

    //Stars
    this.load.image("star", "star.png");
    this.load.image("redstar", "redStar.png");
    
    
}

function collectRedStar (player, star){
    star.disableBody(true, true);
    score = score + 10
    scoreText.setText('Score: ' + score);
    
}
function collectStar (player, star){
    star.disableBody(true, true);
    score = score + 1
    scoreText.setText('Score: ' + score);
    
}

function PlayerVehicleCollision(player, vehicle) {
    if (lives == 1) {

        if(alert('You Lose!')){}
        else  window.location.reload();   

    }else{
        lives = lives - 1;
        livesText.setText('lives: ' + lives);
        player.setX(100);
        player.setY(100);
    }
    
    
}
function DrawVehicles(th){
    Audi= th.physics.add.sprite(1200, 290, 'Audi').setScale(0.5).setVelocityX(-VelocityCar1).refreshBody();
    Police= th.physics.add.sprite(100, 10*64 + 34, 'Police').setScale(0.5).setVelocityX(-VelocityCar1).refreshBody();
    MiniTruck= th.physics.add.sprite(750, 11*64 + 34, 'MiniTruck').setScale(0.5).setVelocityX(VelocityCar1).refreshBody();
    Audi2= th.physics.add.sprite(9*64 +34, 450, 'Audi2').setScale(0.5).setVelocityY(VelocityCar1).refreshBody();
    Taxi= th.physics.add.sprite(TaxiX, 345, 'Taxi').setScale(0.5).setVelocityX(VelocityCar1).refreshBody();
    Taxi2= th.physics.add.sprite(10*64 +34, 550, 'Taxi2').setScale(0.5).setVelocityY(-VelocityCar1).refreshBody();

    Audi.body.setSize(210, 90, 50, 25);
    Audi2.body.setSize(90, 210, 50, 25);
    Taxi.body.setSize(210, 90, 50, 25);
    Taxi2.body.setSize(90, 210, 50, 25);
    MiniTruck.body.setSize(210, 90, 50, 25);
    Police.body.setSize(210, 90, 50, 25);

    th.physics.add.overlap(player, Taxi, PlayerVehicleCollision, null, this);
    th.physics.add.overlap(player, Audi, PlayerVehicleCollision, null, this);
    th.physics.add.overlap(player, Taxi2, PlayerVehicleCollision, null, this);
    th.physics.add.overlap(player, Audi2, PlayerVehicleCollision, null, this);
    th.physics.add.overlap(player, MiniTruck, PlayerVehicleCollision, null, this);
    th.physics.add.overlap(player, Police, PlayerVehicleCollision, null, this);

}

function create(){

    //Creating Map
    map = this.make.tilemap({ key: "map", tileWidth: 64, tileHeight: 64});
    tileset = map.addTilesetImage("nicetiles","tiles");
    layer = map.createLayer("TileLayer1", tileset, 0, 0);
    
    //Player
    player= this.physics.add.sprite(1200, 100, 'player');
    player.body.setSize(18, 44, 50, 25);
    
    //Vehicles
    DrawVehicles(this);

    //Stars
    DrawStars(this);

    //Text
    scoreText = this.add.text(20, 10, 'Score: 0', { font: "32px Consolas", fill: '#000' });
    livesText = this.add.text(20, 40, 'lives: 3', { font: "32px Consolas", fill: '#000' });
    
    //Player Collison
    this.physics.add.collider(player, layer);
    layer.setCollisionBetween(2, 2);
    player.setBounce(0);
    player.setGravity((0,0));
    player.setCollideWorldBounds(true);

    //Go To Function gameover when player hits finish tile id=5
    //map.setTileIndexCallback(5, gameover, this);

    //Player Animations
    playerAnimations();


    

    TimeText = this.add.text(220, 10, 'Time Left: ' + Time(initialTime),{ font: "32px Consolas", fill: '#000' });

 

    // Each 1000 ms call onEvent
    timedEvent = this.time.addEvent({ delay: 1000, callback: onEvent, callbackScope: this, loop: true });

     
} 

function Time(S){
    var minutes = Math.floor(S/60);
    var seconds = S%60;
    seconds = seconds.toString().padStart(2,'0');
    var string = minutes+":"+seconds
    return string;
}

function onEvent (){
    initialTime -= 1; // One second
    TimeText.setText('Time Left: ' + Time(initialTime));
    
}

function checktimeOver() {
    if (initialTime == 0) {
        
        if(alert('Time is Over You Lose!')){}
        else  window.location.reload();   

    }
    
}

function gameover() {
    if (score == 44) {
        if(alert('You Win! \nYour score:'+score+"\n Lives Left :"+lives)){}
        else  window.location.reload(); 
    }
 
}

function DrawStars(th) {

    redstar1 = th.physics.add.group({
        key: 'redstar',
        repeat: 0,
        setXY: { x: 64 * 4 + 30, y: 64 * 5 }
    });
    redstar2 = th.physics.add.group({
        key: 'redstar',
        repeat: 0,
        setXY: { x: 64 * 14 + 30, y: 64 * 11 }
    });


    stars1 = th.physics.add.group({
        key: 'star',
        repeat: 5,
    });

    stars2 = th.physics.add.group({
        key: 'star',
        repeat: 5,
    });

    stars3 = th.physics.add.group({
        key: 'star',
        repeat: 5,
    });
    
    stars4 = th.physics.add.group({
        key: 'star',
        repeat: 5,
    });



    var rect = new Phaser.Geom.Rectangle(20, 20,556 ,  236);
    Phaser.Actions.RandomRectangle(stars1.getChildren(), rect);

    rect = new Phaser.Geom.Rectangle(0, 388,556 ,  236);
    Phaser.Actions.RandomRectangle(stars2.getChildren(), rect);
    
    rect = new Phaser.Geom.Rectangle(11 * 64  +20, 368,556 ,  236);
    Phaser.Actions.RandomRectangle(stars3.getChildren(), rect);
    
    rect = new Phaser.Geom.Rectangle(11 * 64  +20, 11*64+40,556 ,  3*64);
    Phaser.Actions.RandomRectangle(stars4.getChildren(), rect);

    th.physics.add.overlap(player, redstar1, collectRedStar, null, this);
    th.physics.add.overlap(player, redstar2, collectRedStar, null, this);
    th.physics.add.overlap(player, stars1, collectStar, null, this);
    th.physics.add.overlap(player, stars2, collectStar, null, this);
    th.physics.add.overlap(player, stars3, collectStar, null, this);
    th.physics.add.overlap(player, stars4, collectStar, null, this);
    
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

function MoveCars() {
    if (Audi.x < 0) {
        Audi.setX(1350);
    }
    if (Taxi.x >1350) {
        Taxi.setX(0);
    }
    if (Taxi2.y < -100) {
        Taxi2.setY(1200);
    }
    if (Audi2.y >1200) {
        Audi2.setY(-100);
    }
    if (Police.x < 0) {
        Police.setX(1350);
    }
    if (MiniTruck.x >1350) {
        MiniTruck.setX(0);
    } 
}


function checkTrafficCollision(th) {
    if(th.physics.overlap(Taxi, Audi2) ){
        Audi2.setVelocityY(0);
    }else{
        Audi2.setVelocityY(VelocityCar1);
        if(th.physics.overlap(Audi, Audi2) ){
            Audi2.setVelocityY(0);
        }else{
            Audi2.setVelocityY(VelocityCar1);
            if(th.physics.overlap(Police, Audi2) ){
                Audi2.setVelocityY(0);
            }else{
                Audi2.setVelocityY(VelocityCar1);
                if(th.physics.overlap(MiniTruck, Audi2) ){
                    Audi2.setVelocityY(0);
                }else{
                    Audi2.setVelocityY(VelocityCar1);
                }
            }
        }
    }

    if(th.physics.overlap(Taxi, Taxi2) ){
        Taxi2.setVelocityY(0);
    }else{
        Taxi2.setVelocityY(VelocityCar1);
        if(th.physics.overlap(Audi, Taxi2) ){
            Taxi2.setVelocityY(0);
        }else{
            Taxi2.setVelocityY(-VelocityCar1);
            if(th.physics.overlap(MiniTruck, Taxi2) ){
                Taxi2.setVelocityY(0);
            }else{
                Taxi2.setVelocityY(-VelocityCar1);
                if(th.physics.overlap(Police, Taxi2) ){
                    Taxi2.setVelocityY(0);
                }else{
                    Taxi2.setVelocityY(-VelocityCar1);
                }
            }
        }
    }
    
}
function checkWin() {
    if (player.x > 1216 && player.y < 30) {
        gameover();
    }
}

function update(){
    MoveCars();
    checkWin();
    checktimeOver();
    checkTrafficCollision(this);
    cursors = this.input.keyboard.createCursorKeys();
    playerMovement();

}