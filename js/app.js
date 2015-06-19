// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = 0;
    this.y = 80 * randomNum(5) - 15;
    this.speed = 50 * (randomNum(4) + 1);
    console.log("speed: " + this.speed + " y: " + this.y);
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x <= 505){
        this.x = this.x + this.speed * dt;
    } else {
        this.x = 0;
      }
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function() {

  this.sprite = 'images/zelda-sprites-link.png';

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
  this.x = 214;
  this.y = 384;
// if this variables are changed the game loop will move the player
// to the following coordinates
  this.x_ = 214;
  this.y_ = 384;
// used for animation of player
  this.tickCount = 0;
  this.ticksPerFrames = 6;
  this.frame = 0;
// direction in which the playing is moving 0=down, etc.
  this.way = 0;
}

Player.prototype.update = function(dt){




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
    console.log("down: " + this.y);

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
    console.log("up: " + this.y);
  }
    else {
    this.x = this.x_;
    this.y = this.y_;
  }

  console.log("x: " + this.x + "  y: " + this.y)


}

Player.prototype.walking = function(way){

  switch (way) {
      case 0:
          // down
          this.way = 0;
          if ((469 >= this.y_ + 85)){
            this.y_ = this.y_ + 85;
          }
          break;
      case 1:
          // left
          this.way = 1;
          if ((14 <= this.x_ - 100)){
            this.x_ = this.x_ - 100;
          }
          break;
      case 2:
          // up
          this.way = 2;
          if ((44 <= this.y_ - 85)){
            this.y_ = this.y_ - 85;
          }
          break;
      case 3:
          // right
          this.way = 3;
          if ((414 >= this.x_ + 100)){
            this.x_ = this.x_ + 100;
          }
          break;
  }


}

Player.prototype.render = function(){
  //ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

  ctx.imageSmoothingEnabled = false;
  ctx.drawImage(Resources.get(this.sprite),
                              this.Link[this.way][this.frame].s_x,
                              this.Link[this.way][this.frame].s_y,
                              this.Link[this.way][this.frame].s_w,
                              this.Link[this.way][this.frame].s_h, this.x, this.y, 75, 80);
}


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
    console.log("in space");
  } else {
    console.log("key not recognize");
  }

}

var randomNum = function(num){
  return Math.floor(Math.random()*(num));
}


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [new Enemy()];
var player = new Player();

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
