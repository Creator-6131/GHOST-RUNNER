var tower, towerImg
var door, doorImg, doorG
var climber, climberImg, climberG
var ghost, ghostImg
var invisibleBlk, invisibleBlkG
var gameState="play"
var spookySnd

function preload() {
  towerImg= loadImage("tower.png");
  doorImg= loadImage("door.png");
  climberImg= loadImage("climber.png");
  ghostImg= loadImage("ghost-standing.png")
  spookySnd= loadSound("spooky.wav")

  
}


function setup() {
  createCanvas(600, 600);
  
  spookySnd.loop();
  
  tower=createSprite(300,300);
  tower.addImage("tower", towerImg);
  tower.velocityY=2;

  doorG= new Group ();
  climberG= new Group ();
  invisibleBlkG= new Group ();
  
  ghost= createSprite(200,200,50,50);
  ghost.addImage("ghost", ghostImg);

  ghost.scale= 0.3;
}

function draw() {
  background(220);

  if (gameState==="play"){
    if (tower.y>400) {
    tower.y=300;
  }
  
  if (keyDown("right_arrow")){
    ghost.x=ghost.x+3;
  }
  
    if (keyDown("left_arrow")){
    ghost.x=ghost.x-3; 
  }
  
    if (keyDown("space")){
      ghost.velocityY=-7;
  }
    
  ghost.velocityY=ghost.velocityY+0.8;
  
  spawnDoors();
   
    if (climberG.isTouching(ghost)){
      
      ghost.velocityY=0;
      
    }
    
    if(invisibleBlkG.isTouching (ghost)|| (ghost.y>600)){
      
      ghost.destroy();
      gameState="end";
      spookySnd.stop();
      
      
    }
    
  
  drawSprites();
    
  }
  
  if (gameState==="end"){
    
    stroke("yellow")
    fill("yellow")
    textSize(30)
    text("GAME OVER!",230,250)
    
    
  }
  
}

function spawnDoors() {
  
  if (frameCount %120===0){
      door=createSprite(200,50)
      climber=createSprite(200,100)
      invisibleBlk=createSprite(200,100,150,10)
      invisibleBlk.width=climber.width;
      invisibleBlk.heigth= 2;   
      invisibleBlk.visible= false;           
    
      door.addImage ("door", doorImg)
      climber.addImage ("climber", climberImg)
    
      door.velocityY=2;
      climber.velocityY= 2;
      invisibleBlk.velocityY= 2;
     
    door.x= Math.round(random(140,350));
    climber.x= door.x;
    invisibleBlk.x= door.x;
    
    ghost.depth=door.depth 
    ghost.depth= ghost.depth+ 1                     
    
    door.lifetime= 300;
    doorG.add(door)
    
    climber.lifetime= 300;
    climberG.add(climber);
    
    invisibleBlk.lifetime= 300;
    invisibleBlkG.add(invisibleBlk);
    
  }
  
  
  
}

