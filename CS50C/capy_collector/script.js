/* Students: Please use this week's project for Week 13: Assignment 11: Basic Game. 
     You will need to replace the contents of this JavaScript file with your own work, 
     and create any other files, if any, required for the assignment.
     When you are done, be certain to submit the assignment in both Repl.it and Canvas to be graded. */
var config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 300 },
      debug: false
    }
  },
  scene: {
    preload: preload,
    create: create,
    update: update
  }
};

var player;
var oranges;
var bombs;
var platforms;
var cursors;
var score = 0;
var gameOver = false;
var scoreText;

var game = new Phaser.Game(config);

function preload() {
  this.load.image('sky', 'assets/sky.png');
  this.load.image('ground', 'assets/platform.png');
  this.load.image('star', 'assets/star.png');
  this.load.image('bomb', 'assets/bomb.png');
  this.load.image('orange', 'assets/orange.png');
  this.load.spritesheet('dude', 'assets/capybara_sprite.png', { frameWidth: 120, frameHeight: 120 });
}

function create() {
  //  A simple background for our game
  this.add.image(400, 300, 'sky');

  //  The platforms group contains the ground and the 2 ledges we can jump on
  platforms = this.physics.add.staticGroup();

  //  Here we create the ground.
  //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
  platforms.create(400, 568, 'ground').setScale(2).refreshBody();

  //  Now let's create some ledges
  platforms.create(600, 400, 'ground');
  platforms.create(50, 250, 'ground');
  platforms.create(750, 220, 'ground');

  // The player and its settings
  player = this.physics.add.sprite(100, 450, 'dude').setScale(0.5);

  //  Player physics properties. Give the little guy a slight bounce.
  player.setBounce(0.2);
  player.setCollideWorldBounds(true);

  //  Our player animations, turning, walking left and walking right.
  this.anims.create({
    key: 'left',
    frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
    frameRate: 10,
    repeat: -1
  });

  this.anims.create({
    key: 'turn',
    frames: [{ key: 'dude', frame: 4 }],
    frameRate: 20
  });

  this.anims.create({
    key: 'right',
    frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
    frameRate: 10,
    repeat: -1
  });

  this.anims.create({
    key: 'orange',
    frames: [{ key: 'fruit', frame: 4 }],
    frameRate: 20
  });

  //  Input Events
  cursors = this.input.keyboard.createCursorKeys();

  //  Some oranges to collect, 12 in total, evenly spaced 70 pixels apart along the x axis
  oranges = this.physics.add.group({
    key: 'orange',
    repeat: 11,
    setXY: { x: 12, y: 0, stepX: 70 }
  });

  oranges.children.iterate(function(child) {

    //  Give each orange a slightly different bounce
    child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));

  });

  bombs = this.physics.add.group();

  //  The score
  scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });

  //  Collide the player and the oranges with the platforms
  this.physics.add.collider(player, platforms);
  this.physics.add.collider(oranges, platforms);
  this.physics.add.collider(bombs, platforms);

  //  Checks to see if the player overlaps with any of the oranges, if he does call the collectorange function
  this.physics.add.collider(player, oranges, collectorange, null, this);

  this.physics.add.collider(player, bombs, hitBomb, null, this);
}

function update() {
  if (gameOver) {
    return;
  }

  if (cursors.left.isDown) {
    player.setVelocityX(-160);

    player.anims.play('left', true);
  }
  else if (cursors.right.isDown) {
    player.setVelocityX(160);

    player.anims.play('right', true);
  }
  else {
    player.setVelocityX(0);

    player.anims.play('turn');
  }

  if (cursors.up.isDown && player.body.touching.down) {
    player.setVelocityY(-330);
  }
}

function collectorange(player, orange) {
  if (((orange.y + (orange.height / 4)) < (player.y - (player.height / 4))) && (orange.body.velocity.y >= 0)) {

    orange.disableBody(true, true);
    //  Add and update the score
    score += 10;
    scoreText.setText('Score: ' + score);
  } else {
    orange.setVelocityX(player.body.velocity.x / 2);
    orange.setVelocityY(500);
    orange.setCollideWorldBounds(true);
  }


  if (oranges.countActive(true) === 0) {
    //  A new batch of oranges to collect
    oranges.children.iterate(function(child) {

      child.enableBody(true, child.x, 0, true, true);

    });

    var x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);

    var bomb = bombs.create(x, 16, 'bomb');
    bomb.setBounce(1);
    bomb.setCollideWorldBounds(true);
    bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
    bomb.allowGravity = false;

  }
}

function hitBomb(player, bomb) {
  this.physics.pause();

  player.setTint(0xff0000);

  player.anims.play('turn');

  gameOver = true;
}