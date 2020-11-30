var PLAY = 1;
var END = 0;
var gameState = PLAY;

var monkey , monkey_running
var food,banana ,bananaImage, obstacle, obstacleImage
var bananaGroup, obstaclesGroup
var score=0

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(600,600)
  
  monkey=createSprite(80,355,20,20)
  monkey.addAnimation("moving",monkey_running)
  monkey.scale=0.1;
  
  ground=createSprite(400,390,1200,10);
  ground.velocityX=-4;

  
  
  bananaGroup=createGroup();
  obstaclesGroup=createGroup();
}



function draw() {
background("white")
   
  if(ground.x<0){
    ground.x=ground.width/2;
  }
  if(keyDown("space")) {
        monkey.velocityY = -12;
        
    }
  monkey.velocityY = monkey.velocityY + 0.8;
  
  stroke("black");
  textSize(20);
  fill("black");
  text("score:"+score,500,50)
      
  monkey.collide(ground);
  
  
  stroke("black");
  textSize(20);
  fill("black");
 var survivalTime=Math.round(frameCount/frameRate())
  text("SurvivalTime:"+survivalTime,100,50)

  if(gameState === PLAY){
    
   
 
    if(obstaclesGroup.isTouching(monkey)){
     gameState=END;
  }
     if(bananaGroup.isTouching(monkey)){
     bananaGroup.destroyEach();
     score=score+1;
       
  }
      
 spawnfoods()
 spawnObstacles()
  
  }
   else if (gameState === END) {
      obstaclesGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);
     ground.velocityX = 0;
     obstaclesGroup.setVelocityXEach(0);
     bananaGroup.setVelocityXEach(0);  
     bananaGroup.destroyEach();
      if(keyDown("space")) {
        monkey.velocityY = -0;
        
    }
   
   }
  
 
  
  

  drawSprites();
}
function spawnfoods(){
  
  if (frameCount % 80 === 0) {
    var food = createSprite(500,120,10,10);
    food.y = Math.round(random(120,200));
    food.addImage(bananaImage);
    food.scale = 0.1;
    food.velocityX = -3;
    food.lifeTime=170
    bananaGroup.add(food)
    
}
}


function spawnObstacles(){
  if(frameCount%300 === 0){
    var obstacle=createSprite(500,370,10,10)
    obstacle.lifetime = 200;
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.1;
    obstacle.velocityX = -5;
    obstaclesGroup.add(obstacle)
  }
}

