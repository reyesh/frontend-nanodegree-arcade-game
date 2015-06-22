// Enemies our player must avoid
var Enemy = function(y, dir) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = 0;
    this.dir = dir;

    if ( !y ){
      this.y = 80 * randomNum(5) - 15;
      this.speed = 50 * (randomNum(4) + 1);
    } else {
      this.y = y;
      this.speed = 50 * (randomNum(4) + 1);
    }
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    // depending on the enemy dir variable, the enemy can move left or right on screen

    if (this.dir == 'right'){

        if (this.x <= 505){
            this.x = this.x + this.speed * dt;
        } else {
            this.x = 0;
          }

      } else {

        if (this.x >= 0){
            this.x = this.x - this.speed * dt;
        } else {
            this.x = 505;
          }

      }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {

  // we only want the enemy to render when the game is in an actual level

  if(gameData.level == 1 || gameData.level ==2) {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function() {

  this.sprite = 'images/zelda-sprites-link.png';

  //this arrow holds the different position from the sprite sheet
  // it also has link in attack mode but currently it's not being used the 3rd and 4th frames.
  //link going down [0], left[1], up[2], right[3]
  this.Link=[
              [ {s_x: 0, s_y: 0, s_w: 15, s_h: 16},
                {s_x: 0, s_y: 30, s_w: 15, s_h: 16},
                {s_x: 0, s_y: 60, s_w: 15, s_h: 16},
                {s_x: 0, s_y: 84, s_w: 27, s_h: 16}
              ],[
                {s_x: 30, s_y: 0, s_w: 15, s_h: 16},
                {s_x: 30, s_y: 30, s_w: 15, s_h: 16},
                {s_x: 30, s_y: 60, s_w: 15, s_h: 16},
                {s_x: 24, s_y: 90, s_w: 15, s_h: 27}
              ],[
                {s_x: 62, s_y: 0, s_w: 15, s_h: 16},
                {s_x: 62, s_y: 30, s_w: 15, s_h: 16},
                {s_x: 60, s_y: 60, s_w: 15, s_h: 16},
                {s_x: 60, s_y: 84, s_w: 27, s_h: 16}
              ],[
                {s_x: 90, s_y: 0, s_w: 15, s_h: 16},
                {s_x: 90, s_y: 30, s_w: 15, s_h: 16},
                {s_x: 90, s_y: 60, s_w: 15, s_h: 16},
                {s_x: 90, s_y: 84, s_w: 15, s_h: 27}
              ],
            ];


  this.s_x=91;
  this.s_y=0;
  this.s_w=15;
  this.s_h=16;

// start position for the player
  this.x = 14;
  this.y = 469;
//this start position for the coord used in Game class
  this.row = 5;
  this.col = 0;
  this.rowMax = 4;
  this.colMax = 5;
// if this variables are changed the game loop will move the player
// to the following coordinates
  this.x_ = 14;
  this.y_ = 469;
// used for animation of player
  this.tickCount = 0;
  this.ticksPerFrames = 6;
  this.frame = 0;
// direction in which the playing is moving 0=down, etc.
  this.way = 0;
};

Player.prototype.update = function(dt){


// the following detects whether the player wants his charector to move
// and handles the animation

  if (this.x < this.x_){ //right
    this.tickCount += 1;
    if(this.tickCount > this.ticksPerFrames){
      if (this.frame < 2 ){
        this.frame += 1;
        this.tickCount = 0;
        if (this.frame == 2){ this.frame = 0; }
      }
    }
    this.x = Math.round(this.x + 5);

  } else if (this.x > this.x_) { // left
   this.tickCount += 1;
    if(this.tickCount > this.ticksPerFrames){
      if (this.frame < 2 ){
        this.frame += 1;
        this.tickCount = 0;
        if (this.frame == 2){ this.frame = 0; }
      }
    }
    this.x = Math.round(this.x - 5);

  } else if (this.y < this.y_){ // down
    this.tickCount += 1;
    if(this.tickCount > this.ticksPerFrames){
      if (this.frame < 2 ){
        this.frame += 1;
        this.tickCount = 0;
        if (this.frame == 2){ this.frame = 0; }
      }
    }
    this.y = Math.round(this.y + 5);

  } else if (this.y > this.y_){ // up
    this.tickCount += 1;
    if(this.tickCount > this.ticksPerFrames){
      if (this.frame < 2 ){
        this.frame += 1;
        this.tickCount = 0;
        if (this.frame == 2){ this.frame = 0; }
      }
    }
    this.y = Math.round(this.y - 5);
  }
    else {
    this.x = this.x_;
    this.y = this.y_;
  }


};

Player.prototype.walkable = function(letter){
// function used to determine if the terrain is walkable
  if (letter == 'w') {
    return false;
  } else if (letter == 's') {
    return true;
  } else if (letter == 'g'){ // if letter equals g, it returns the grass-block
    return true;
  } else {
    return false;
  }

};

Player.prototype.walking = function(way){

  // this function sets the boundary for the player to move on screen. Basically
  // so he doesnt go off screen, and walk on water.
  switch (way) {
      case 0:
          // down
          this.way = 0;
          if (this.row+1 > this.rowMax+1) {console.log("these are the breaks"); break;}
          if (this.walkable(gameData.levels[gameData.level][this.row+1][this.col])){
            this.y_ = this.y_ + 85;
            this.row++;
            console.log(gameData.levels[gameData.level][this.row][this.col]);
            console.log("row: " + this.row + "  col: " + this.col);
          }

          break;
      case 1:
          // left
          this.way = 1;
          if (this.col-1 < 0 ) {console.log("these are the breaks"); break;}
          if (this.walkable(gameData.levels[gameData.level][this.row][this.col-1])){
            this.x_ = this.x_ - 100;
            this.col--;
            console.log(gameData.levels[gameData.level][this.row][this.col]);
            console.log("row: " + this.row + "  col: " + this.col);

          }
          break;
      case 2:
          // up
          this.way = 2;
          if (this.row-1 < 0 ) {console.log("these are the breaks"); break;}
          if (this.walkable(gameData.levels[gameData.level][this.row-1][this.col])){
            this.y_ = this.y_ - 85;
            this.row--;
            console.log(gameData.levels[gameData.level][this.row][this.col]);
            console.log("row: " + this.row + "  col: " + this.col);

          }
          break;
      case 3:
          // right
          this.way = 3; console.log(this.col + " ");
          if (this.col+1 >= this.colMax ) {console.log("these are the breaks"); break;}
          if (this.walkable(gameData.levels[gameData.level][this.row][this.col+1])){
            this.x_ = this.x_ + 100;
            this.col++;
            console.log(gameData.levels[gameData.level][this.row][this.col]);
            console.log("row: " + this.row + "  col: " + this.col);

          }
          break;
  }


};


Player.prototype.render = function(){
  //we only want the player rendered if his an a level

  ctx.imageSmoothingEnabled = false;
  if(gameData.level == 1 || gameData.level ==2) {
  ctx.drawImage(Resources.get(this.sprite),
                              this.Link[this.way][this.frame].s_x,
                              this.Link[this.way][this.frame].s_y,
                              this.Link[this.way][this.frame].s_w,
                              this.Link[this.way][this.frame].s_h, this.x, this.y, 75, 80);
  }
};


Player.prototype.handleInput = function(e){
  console.log(e);
  if (e == 'right'){
    this.walking(3);
  } else if (e == 'left'){
    this.walking(1);
  } else if (e == 'up'){
    this.walking(2);
  } else if (e == 'down'){
    this.walking(0);
  } else if (e == 'space'){
    gameData.level = 1;
  } else {
    console.log("key not recognize");
  }

};

var randomNum = function(num){
  return Math.floor(Math.random()*(num));
};

// the following class is used to store the current state of the game, levels
// sounds, and terrain

var Game = function() {

        this.level = 0;
        this.music = 1;
        this.snd = new Audio("02-overworld.mp3");
        this.snd2 = new Audio("04-labyrinth.mp3");

        this.levels= [
                       [
                        ['title'],
                       ],
                       [
                        ['s','w','w','w','w'],
                        ['g','g','g','g','g'],
                        ['g','g','g','g','g'],
                        ['g','g','w','w','g'],
                        ['w','w','w','w','g'],
                        ['g','g','g','g','g'],
                      ],
                      [
                        ['s','s','s','s','s'],
                        ['s','w','w','w','w'],
                        ['s','s','s','s','s'],
                        ['w','w','w','w','s'],
                        ['s','s','s','s','s'],
                        ['s','w','w','w','w'],
                      ],
                      [
                        ['gameover']
                      ],
                      [
                        ['theend']
                      ]

                     ];
        // this is the x & y coordinates for every block the player can be on, this will be used to check a block to see
        // if it's possible for the player to walk on, for example if the block is water we dont want to player walking there
        this.coord= [
                      [{x: 14, y: 44 },{x: 114, y: 44 },{x: 214, y: 44 },{x: 314, y: 44 },{x: 414, y: 44}],
                      [{x: 14, y: 129},{x: 114, y: 129},{x: 214, y: 129},{x: 314, y: 129},{x: 414, y: 129}],
                      [{x: 14, y: 214},{x: 114, y: 214},{x: 214, y: 214},{x: 314, y: 214},{x: 414, y: 214}],
                      [{x: 14, y: 299},{x: 114, y: 299},{x: 214, y: 299},{x: 314, y: 299},{x: 414, y: 299}],
                      [{x: 14, y: 384},{x: 114, y: 384},{x: 214, y: 384},{x: 314, y: 384},{x: 414, y: 384}],
                      [{x: 14, y: 469},{x: 114, y: 469},{x: 214, y: 469},{x: 314, y: 469},{x: 414, y: 469}],
                    ];


};

Game.prototype.update = function (row, col){

  //this function detects if the player reaches certain spots on the level
  //which advances the player to the next level.

  if (gameData.level==1){
    if(row===0 && col===0 && player.way==2){
      this.level=2;
      player.x = 14;
      player.y = 469;
      player.row = 5;
      player.col = 0;
      player.x_ = 14;
      player.y_ = 469;
      gameData.music=2;
    }
  } else if (gameData.level==2){
    if(row===0 && col==4 && player.way==2){
      this.level=4;
      gameData.music=1;
    }
  }

};

Game.prototype.chkTerrain = function(letter){

  if (letter == 'w') {
    return 'images/water-block.png';
  } else if (letter == 's') {
    return 'images/stone-block.png';
  } else if (letter == 'g'){ // if letter equals g, it returns the grass-block
    return 'images/grass-block.png';
  } else if (letter == 'title'){
    return 'images/title-screen.png';
  } else {
    return 'images/grass-block.png';
  }

};

Game.prototype.playMusic = function(x){
  if (x == 1) {
    this.snd.play();
    this.snd2.pause();
    this.music = 0;
  } else if (x == 2){
    this.snd.pause();
    this.snd2.play();
    this.music = 0;
  }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [new Enemy(0,'right'),new Enemy(0,'right'),new Enemy(0,'right')];
var allEnemies2 = [new Enemy(305,'right'),new Enemy(145,'left'),new Enemy(-15,'right')];
var player = new Player();
var gameData = new Game();
console.log(gameData.coord[0][0].y);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
        32: 'space'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
