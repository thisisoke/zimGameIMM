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


function weapon(damage,rec,deathTimer){
  this.damage = damage;
  this.rec = rec;
  this.deathTimer = deathTimer;
  this.spawntime = 5;
  this.active = false;
  this.timeInactive = 0;
  this.timeActive = 0;
  //this.bulletsAlive = false;
}

let peashooter = new weapon(10,weaponsSP[0],15);
let rifle = new weapon(90,weaponsSP[1],15);
let multicannon = new weapon(8,weaponsSP[2],30);
let flamer = new weapon(5,weaponsSP[3],30);
let railgun = new weapon(20,weaponsSP[4],45);
let arcrifle = new weapon(3,weaponsSP[5],45);
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
    bullets.push(new Circle(10,red).pos(peashooter.rec.x,peashooter.rec.y).animate({props:{x:width, y:rand(peashooter.rec.y - (height / 6), peashooter.rec.y + (height / 6))},time:{min:1, max:3}, ease:"linear"}));
  //attach two hitboxes, hit tests are what i think they are called
  //for the first hit box if it comes into contact with the player destory bullet and have the player take damage
  //for the second hit box if it comes into contact with a screen boundry destroy the bullet, this way if the player dodges forever the computer wont crash
}//end of func
shootPeashooter();
  zog(bullets);
//console.log(w);
//console.log(g);


    // PART 1 [10]
    // Load the island backing image and title
    // (no variables)

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
