var oceanImg, ocean;
var coinImg, coin, coinGroup;
var climberImg, climber, climbersGroup;
var frog, frogImg, gameOverImg;

var gameState = "play"
var score = 0;

function preload(){
  oceanImg = loadImage("water.jpg");
  coinImg = loadImage("coin.png");
  climberImg = loadImage("seaweed.png");
  frogImg = loadImage("frog.png");
  gameOverImg=loadImage("gameOver.png");
  
}

function setup(){
  createCanvas(580,450);
  
  ocean = createSprite(300,300);
  ocean.addImage("ocean",oceanImg);
  console.log(ocean.height);
  frog = createSprite(200,200,50,50);
  frog.scale = 0.1;
  frog.addImage("frog", frogImg);  
  
  //create coin group and climber group
  climbersGroup = new Group();
  coinGroup = new Group();
}

function draw(){
  background("ocean");
  drawSprites();
  textSize(25);
  fill("orange");
  text("Score:"+score,400,50);
  if (gameState === "play") {
    
  ocean.setVelocity(0,1);
  if (keyDown('space')) {
    frog.velocityY=-6;
  } else{
    frog.velocityY = 4;
  }
  if (keyDown("right") && frog.position.x<550) {
    frog.position.x +=4;
    frog.setVelocity(0,0);
  }
  if (keyDown("left") && frog.position.x>10) {
    frog.position.x -=4;
    frog.setVelocity(0,0);
  }
 
spawnCoin();

if (climbersGroup.isTouching(frog)){
  frog.setVelocity(0,0);
}
if (coinGroup.isTouching(frog)) {
  score ++;
}
if(frog.position.y>450){
gameState="end";
}
  }
  if(ocean.position.y>300){
    ocean.position.y = 250;
  }
  
  if (gameState === "end"){
    frog.addImage("frog",gameOverImg);
    frog.position.x= 270;
    frog.position.y= 200;
    frog.setVelocity(0,0);
    frog.scale=0.5;
    climbersGroup.destroyEach();
    coinGroup.destroyEach();
    ocean.setVelocity(0,0);
    

  }

}

// create the coin and climber in the same function
function spawnCoin() {
  
  if (frameCount % 100 === 0) {
    //make the x position of the coin and climber the same
   var climber = createSprite(Math.round(random(0,580)));
   climber.addImage("climber",climberImg);
   climber.setVelocity(0,2);
   climber.scale=0.3;
   climber.lifetime = 300;
   climbersGroup.add(climber);
  


   var coin = createSprite(climber.x, climber.y-30);
   coin.addImage("coin",coinImg);
   coin.setVelocity(0,2);
   coin.scale=0.1;
   coin.lifetime=300;
   coinGroup.add(coin);   






  }
}

