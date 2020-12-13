var scaling = "fit"; // this will resize to fit inside the screen dimensions
var width = 1024;
var height = 768;
var color = white;
var outerColor = silver;

//Loading in assets in const variables
// const assets = [];
// const path = "assets/";

//adding asset and path to frame parameters to be loaded in.
var frame = new Frame(scaling, width, height, color, outerColor);
  frame.on("ready", function() {
  zog("ready from ZIM Frame"); // logs in console (F12 - choose console)

  const stage = frame.stage;
  const stageW = frame.width;
  const stageH = frame.height;

  // VARIABLES
  let floor1difficulty;
  let floor2difficulty;
  let floor3difficulty;

  let scoreCountLabel;
  let gameTimeLabel;
  let score = 0;

  //move to array when doing hit test for character Array[]
  let rectFloor1;
  let rectFloor2;
  let rectFloor3;



  const weaponsSP =
    [new Rectangle(40,20,black).pos(0,120),
    new Rectangle(40,20,black).pos(stageW - 40,(stageH/6)),
    new Rectangle(40,20,black).pos(0,(stageH/6)+ stageH/3),
    new Rectangle(40,20,black).pos(stageW - 40,(stageH/6)+ stageH/3),
    new Rectangle(40,20,black).pos(0,(stageH/6)+ stageH/3+ stageH/3),
    new Rectangle(40,20,black).pos(stageW - 40,(stageH/6)+ stageH/3 + stageH/3)];

  // let weaponsArray = [new Rectangle({width:40px, height: 20px, color: black}), new Rectangle({width:40px, height: 20px, color: purple}), new Rectangle({width:40px, height: 20px, color: green})];

  //left and right handedness for if cannonpositions true = left, false = right
  const lrHand = [true, false, true, false, true, false];

  function weapon(damage,rpos,deathTimer,minSpeed,maxSpeed){
    this.damage = damage;
    this.rec = weaponsSP[rpos];
    this.deathTimer = deathTimer;
    this.spawntime = 5;
    this.active = false;
    this.timeInactive = 0;
    this.timeActive = 0;
    this.minSpeed = minSpeed;
    this.maxSpeed = maxSpeed;
    //yes i know i can just use modulo and rpos but aint got time to be fancy with math
    this.lrHand = lrHand[rpos];
    //this.bulletsAlive = false;
  }

  let peashooter = new weapon(10,0,15,3,1);
  let rifle = new weapon(90,1,15,4,3);
  let multicannon = new weapon(8,2,30,3,3);
  let flamer = new weapon(5,3,30,1,1);
  let railgun = new weapon(20,4,45,1,1);
  let arcrifle = new weapon(3,5,45,1,1);
  let weaponsList = [peashooter, rifle, multicannon, flamer, railgun, arcrifle];

  //ok so we have 3 rows with 2 coloms where weapons can spawn
  //we want weapons to die and respawn after a certin time, so a weapon can live for say 30 secons and it takes 10 seconds to respawn to give the user some respit
  //we want two arrays, one for the weapons in use and one for the weapons out of use
  let weaponsActive = [];
  let weaponsInactive = [peashooter, rifle, multicannon, flamer, railgun, arcrifle];
  //zog(weaponsActive);
  zog(weaponsInactive);

  //we then want to account for what room positions (the rows and cols) do and dont have weapons on them
  let posActive = [];
  let posInactive = [0,1,2,3,4,5];
  //zog(posInactive);

  //run the updateWeapons Function every second
  setInterval(updateWeapons,1000);

  //we then want to take weapons that respawn and put them into those freed up room positions, and we want to take the weapons that die and remove them
  function updateWeapons(){
    //this check allows us to see if all the weapons are active or not
    //this function triggers every second by default
    //zog("im triggered");

    //itterate through the weapons list
    for (var i = 0; i < 6; i++){
      //zog(i);
      if(weaponsList[i].active == false){
        weaponsList[i].timeInactive += 1;
        //check to see if the timeInactive is equal to the spawn time
        if (weaponsList[i].timeInactive == weaponsList[i].spawntime){
          weaponsList[i].timeInactive = 0;
          weaponsList[i].active = true;
          weaponsList[i].rec.animate({props:{color:blue},time:5});
        }//end of nested if
      }//end of original if
      //else if there is an alive item check to see how long its been alive for, if its been alive longer than its life timer then kill it
      else if (weaponsList[i].active == true){
        weaponsList[i].timeActive += 1;
        if (weaponsList[i].timeActive == weaponsList[i].deathTimer){
          weaponsList[i].timeActive = 0;
          weaponsList[i].active = false;
          weaponsList[i].rec.animate({props:{color:green},time:5});
        }//end of nested esleif
      }//end of original elseif
    }//end for
  stage.update();
}//end func

var bullets = [];

function shootPeashooter(){
  //spawn new polygon, animate it across the screen
  if (peashooter.lrHand == true){
    bullets.push(new Circle(10,red).pos(peashooter.rec.x,peashooter.rec.y).animate({props:{x:width, y:rand(peashooter.rec.y - (height / 6), peashooter.rec.y + (height / 6))},time:{min:peashooter.minSpeed, max:peashooter.maxSpeed}, ease:"linear"}));

    //attach two hitboxes, hit tests are what i think they are called
    //for the first hit box if it comes into contact with the player destory bullet and have the player take damage
    //for the second hit box if it comes into contact with a screen boundry destroy the bullet, this way if the player dodges forever the computer wont crash
    }
    else if (peashooter.lrHand == false){
      bullets.push(new Circle(10,red).pos(peashooter.rec.x,peashooter.rec.y).animate({props:{x:0, y:rand(peashooter.rec.y - (height / 6), peashooter.rec.y + (height / 6))},time:{min:peashooter.minSpeed, max:peashooter.maxSpeed}, ease:"linear"}));

      //attach two hitboxes, hit tests are what i think they are called
      //for the first hit box if it comes into contact with the player destory bullet and have the player take damage
      //for the second hit box if it comes into contact with a screen boundry destroy the bullet, this way if the player dodges forever the computer wont crash
  }
}//end of func
shootPeashooter();
zog(bullets);
//console.log(w);
//console.log(g);

function shootRifle(){
  if (rifle.lrHand == true){
    bullets.push(new Circle(10,red).pos(rifle.rec.x,rifle.rec.y).animate({props:{x:width, y:rand(rifle.rec.y - (height / 12), rifle.rec.y + (height / 12))},time:{min:rifle.minSpeed, max:rifle.maxSpeed}, ease:"backOut"}));
    //attach two hitboxes, hit tests are what i think they are called
    //for the first hit box if it comes into contact with the player destory bullet and have the player take damage
    //for the second hit box if it comes into contact with a screen boundry destroy the bullet, this way if the player dodges forever the computer wont crash
  }
  else if (rifle.lrHand == false){
    bullets.push(new Circle(10,red).pos(rifle.rec.x,rifle.rec.y).animate({props:{x:0, y:rand(rifle.rec.y - (height / 6), rifle.rec.y + (height / 6))},time:{min:rifle.minSpeed, max:rifle.maxSpeed}, ease:"backOut"}));
    //attach two hitboxes, hit tests are what i think they are called
    //for the first hit box if it comes into contact with the player destory bullet and have the player take damage
    //for the second hit box if it comes into contact with a screen boundry destroy the bullet, this way if the player dodges forever the computer wont crash
  }

}
shootRifle();

function shootmultiCannon(){
  for (let x = 0; x != 3; x++){
    if (multicannon.lrHand == true){
      bullets.push(new Circle(10,red).pos(multicannon.rec.x,multicannon.rec.y).animate({props:{x:width, y:rand(multicannon.rec.y - (height / 6), multicannon.rec.y + (height / 6))},time:{min:multicannon.minSpeed, max:multicannon.maxSpeed}, ease:"linear"}));
    //attach two hitboxes, hit tests are what i think they are called
    //for the first hit box if it comes into contact with the player destory bullet and have the player take damage
    //for the second hit box if it comes into contact with a screen boundry destroy the bullet, this way if the player dodges forever the computer wont crash
    }
    else if (multicannon.lrHand == false){
      bullets.push(new Circle(10,red).pos(multicannon.rec.x,multicannon.rec.y).animate({props:{x:0, y:rand(multicannon.rec.y - (height / 3), multicannon.rec.y + (height / 3))},time:{min:multicannon.minSpeed, max:multicannon.maxSpeed}, ease:"linear"}));
    //attach two hitboxes, hit tests are what i think they are called
    //for the first hit box if it comes into contact with the player destory bullet and have the player take damage
    //for the second hit box if it comes into contact with a screen boundry destroy the bullet, this way if the player dodges forever the computer wont crash
    }
  }

}
    // PART 1 [10]
    // Load the island backing image and title
    // (no variables)
shootmultiCannon();

var sink = new Circle(10, pink).pos(0,0).alp(0);
var flames;
var flamerIO;
function shootFlamer(b){
  flamerIO = b;
  if (flamerIO == true){
    if (flamer.lrHand == true){
      sink.pos(width,flamer.rec.y).alp(0);
      flames = new Emitter({
         obj:[
            new Circle(8,null,darker,2),
            new Circle(7,null,darker,2),
            new Circle(6,null,darker,2),
         ],
         random:{color:["red", red, "orange", orange, yellow, "yellow"]},
         interval:.02, // default
         life:4,
         decayTime:4, // default
         sink:sink,
         sinkForce:.6,
         gravity:0,
         force:1,
         cache:mobile(), // default
       })
          .pos(flamer.rec.x-100, flamer.rec.y-150)
          .sca(2);
    }
    else if (flamer.lrHand == false){
      sink.pos(0,flamer.rec.y).alp(0);
      flames = new Emitter({
         obj:[
            new Circle(8,null,darker,2),
            new Circle(7,null,darker,2),
            new Circle(6,null,darker,2),
         ],
         random:{color:["red", red, "orange", orange, yellow, "yellow"]},
         interval:.02, // default
         life:4,
         decayTime:4, // default
         sink:sink,
         sinkForce:.6,
         gravity:0,
         force:1,
         cache:mobile(), // default
      })
         .pos(flamer.rec.x-150, flamer.rec.y-150)
         .sca(2);

    }

    //todo add a collision check to these circles, if they hit the player destroy them and the player takes damage also if they hit the boundry box, destroy the colided particle
  }
  else if (flamerIO == false){
    particles.pos(1000,1000);
  }
}
shootFlamer(true);



function shootRailgun(){
  //so for the railgun i want a weapon that will target the players current course and shoot in its direction

  //then after a visual image of where this railgun is about to shoot appears (like a lazer beam) fire a fast moving bullet at the player
}


function shootArcRifle(){
//so for the arcRifle i want a weapon that will direct a particle emitter to where the player is moving
}
  //gameMenu();
  startGame();
  function gameMenu() {
      // This fucntion is for the game menu State

      //start Game
      startGame();
      viewScores();
      endGame();

      //reset all times, counters, and variables except for asset variables

  }

  function updateScores(s){
      //state to view scores

      score += s;
      //let scoreContainer;
      scoreCountLabel = new Label({
             text: "Score: " + score,
             color:white,
             variant:true,
             backgroundColor:"lightblue"
          }).center();

      scoreCountLabel.pos((width / 2) - (scoreCountLabel.width / 2) ,0);
      stage.update();
  }

  function startGame() {
    //This function is to start the Game
    console.log("Game Started");

    updateScores(0);

    // startGameTimer();
    // startPointsCounter();
  //load floors0-3
    // loadAssets();//load character and assets. Chache background

    const floorPosition = stageH;

    rectFloor1 = new Rectangle({
       width: (stageW - 10),
       height: (stageH/3),
       borderWidth: 10,
       borderColor: black
    }).pos(5,5);

    rectFloor2 = new Rectangle({
       width: (stageW - 10),
       height: (stageH/3),
       borderWidth: 10,
       borderColor: black
    }).pos(5,((stageH/3)) );

    rectFloor3 = new Rectangle({
       width: (stageW - 10),
       height: (stageH/3),
       borderWidth: 10,
       borderColor: black
    }).pos(5,((stageH/3)*2));




    // startLevel1();
    // startLevel2();
    // startLevel3();

  }


  function startGameTimer(){

      //start the game timer, use timer to trigger different stages

  }

  function startPointsCounter(){

      //start the points counter, use timer to trigger different stages

  }

  function loadAssets(){
      //load character and assets. Chache background

  };


  function startLevel1(){
      //adjust speed, amount of bullets, and damaged to level1 setting based on time game has been running for

      floor1difficulty = 1;
      floor2difficulty = 34;
      floor3difficulty = 10;

  }

  function startLevel2(){
      //adjust speed, amount of bullets, and damaged to level2 setting based on time game has been running for

      floor1difficulty = 3; //maybe random difficulty
      floor2difficulty = 1;
      floor3difficulty = 4;

  }


  function startLevel3(){
      //adjust speed, amount of bullets, and damaged to level3 setting based on time game has been running for

      floor1difficulty = 3; //maybe random difficulty
      floor2difficulty = 1;
      floor3difficulty = 4;

  }


  function endGame() {

  //User selected options when game ends. Link functions to button onclick event
      //startGame();
      //gameMenu();

  }

  stage.update(); // this is needed to show any changes
});
