var ball;
var database;
var position;

function setup(){
    createCanvas(500,500);
    ball = createSprite(250,250,10,10);
    ball.shapeColor = "red";
    //connection to db
    database = firebase.database();
    //read information from databsae
    //create a refrence to where we are reading or writing from 
    var posRef = database.ref('position');
    //adds a listeners to the database 
    // listens for changes in the database
    //defined in the evenets give
    posRef.on("value",readPosition);
}
function readPosition(data){
    //get the valueof x and y axis from db inrto position
    position = data.val();
    ball.x = position.x;
    ball.y = position.y;


}



function draw(){
    background("white");
    if(keyDown(LEFT_ARROW)){
        changePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        changePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        changePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        changePosition(0,+1);
    }
    drawSprites();
}

function changePosition(x,y){
  //refrence to db
  var posRef = database.ref("position");
  posRef.set({
      'x':position.x + x,
      'y': position.y + y 
  })
}
