var dogimg,happydogimg;
var dog,foodS,foodStock,database;


function preload()
{
dogimg=loadImage("Dog.png");
happydogimg=loadImage("happydog.png");
}

function setup() {
	createCanvas(500,500);
  database=firebase.database();
  foodStock = database.ref("Food")
  foodStock.on("value",readStock)
  foodStock.set(20)

  dog = createSprite(250,350,10,60)
  dog.addImage(dogimg)
  dog.scale = 0.2
  
}


function draw() 
{  
background("green");
if(foodS!==undefined){
  textsize(20)
  fill(255)
  text("press up arrow to feed the dog",50,50)
  text("food remaining:"+foodS,150,150)

  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(happydogimg);
  }

  if(keyWentUp(UP_ARROW)){
    dog.addImage(dogimg);
  }

  if(foodS===0){
    foodS=20;
  }
}
  drawSprites();
}
 
function writeStock(x){
  if(x<=0){
    x=0
  }
  else{
    x=x-1
  }
  database.ref("/").upadate({
    Food:x
  })
  

}
function readStock(data){
  foodS=data.val()
}






