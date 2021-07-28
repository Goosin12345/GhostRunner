var tower;
var towerimg;
var door,doorimg,doorsGroup;
var climber,climberimg,climbergroup;
var ghost,ghostimg;
var invisibleBlock, invisbleBlockGroup;
var gameState = "play"

function preload(){
towerimg = loadImage("tower.png");
doorimg = loadImage("door.png");
climberimg = loadImage("climber.png");
ghostimg = loadImage("ghost-standing.png")
}
function setup(){
    createCanvas(600,600);
    tower = createSprite(300,300,50,50);
    tower.addImage("tower",towerimg);
    tower.velocityY = 1;  
    doorsGroup = new Group();    
    climberGroup = new Group();     
    ghost = createSprite(200,200,10,10);
    ghost.addImage("ghost",ghostimg);  
    invisibleBlockGroup = new Group();   
}



function draw() {
  background("white");

  if(gameState==="play"){

  

  if (tower.y>400){
    tower.y=300;
  }
  
  spawnDoors();
 
  //to make the ghost jump
  if(keyDown("space")){
    ghost.velocityY = -4;
  }
 
  //for gravity
  ghost.velocityY = ghost.velocityY+0.5;
 
  //resizing the ghost
  ghost.scale =0.5;

  //to make ghost go left
  if(keyDown("left")){
    ghost.x = ghost.x -3;
  }
  //to make ghost go right  
  if(keyDown("right")){
    ghost.x = ghost.x +3;
  }
  

  if(climberGroup.isTouching(ghost)){
    ghost.velocityY = 0;
  }

  if(invisibleBlockGroup.isTouching(ghost) || ghost.y>600){
    console.log("hello");
    ghost.destroy();
    gameState = "end"
  }

}

  else if(gameState==="end"){
    textSize(30);
    fill("yellow");
    text("GAME OVER",230,250)
    tower.velocityY=0;
  }

  drawSprites();
  
}

function spawnDoors(){
  if(frameCount % 250===0){
    var door = createSprite(200,-50,10,10);
    door.addImage("door",doorimg);
    door.x = random(120,400);
    door.velocityY=1;
    door.lifetime = 800;
    doorsGroup.add(door);

    var climber = createSprite(200,10,10,10);
    climber.addImage("climber",climberimg);
    climber.x = door.x;
    climber.velocityY=1;
    climberGroup.add(climber);


    ghost.depth = door.depth;
    ghost.depth = ghost.depth + 1;

    invisibleBlock = createSprite(200,15,10,10);
    invisibleBlock.width = climber.width;
    invisibleBlock.height = 2;
    invisibleBlock.x = door.x;
    invisibleBlock.velocityY = 1;
    invisibleBlock.debug = true;
    
  }
  
}