// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = 0;
    this.y = 80 * randomNum(5) - 15;
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x <= 505){
        this.x = this.x + 100 * dt;
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

  this.sprite = 'images/char-cat-girl.png';
//  this.sprite = 'images/zelda-sprites-link.png';
  this.x = 203;
  this.y = 385;

  this.x_ = 203;
  this.y_ = 385;
}

Player.prototype.update = function(dt){

   if (this.x < this.x_){
      this.x = Math.round(this.x + 300 * dt);
    //  this.x = this.x_;
      console.log("x: " + this.x + " x_: " + this.x_);

  } else {
      this.x = this.x_;
  }





}

Player.prototype.render = function(){
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Player.prototype.goRight = function(move){
  if (move) {
    this.x = this.x + 100 * dt;
  } else {
    console.log("goRight");
  }
}

Player.prototype.goRightDt = function(dt,move){

}

Player.prototype.handleInput = function(e){
  console.log(e);
  if (e == 'right'){
    this.x_ = this.x_ + 101;
    console.log("x: " + this.x + "y: " + this.y);
  } else if (e == 'left'){
    this.x_ = this.x_ - 101;
    console.log("x: " + this.x + "y: " + this.y);
  } else if (e == 'up'){
    this.y = this.y - 80;
    console.log("x: " + this.x + "y: " + this.y);
  } else if (e == 'down'){
    this.y = this.y + 80;
    console.log("x: " + this.x + "y: " + this.y);
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
var allEnemies = [new Enemy(), new Enemy(), new Enemy()];
var player = new Player();
console.log(allEnemies.length);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
