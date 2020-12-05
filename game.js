// SCALING OPTIONS
// scaling can have values as follows with full being the default
// "fit"    sets canvas and stage to dimensions and scales to fit inside window size
// "outside"    sets canvas and stage to dimensions and scales to fit outside window size
// "full"    sets stage to window size with no scaling
// "tagID"    add canvas to HTML tag of ID - set to dimensions if provided - no scaling

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



    const weaponsSP = [new Rectangle(40,20,black).pos(0,120), new Rectangle(40,20,black).pos(stageW - 40,(stageH/6)),new Rectangle(40,20,black).pos(0,(stageH/6)+ stageH/3),
   new Rectangle(40,20,black).pos(stageW - 40,(stageH/6)+ stageH/3), new Rectangle(40,20,black).pos(0,(stageH/6)+ stageH/3+ stageH/3), new Rectangle(40,20,black).pos(stageW - 40,(stageH/6)+ stageH/3 + stageH/3)];

    // let weaponsArray = [new Rectangle({width:40px, height: 20px, color: black}), new Rectangle({width:40px, height: 20px, color: purple}), new Rectangle({width:40px, height: 20px, color: green})];


function weapon(damage,rec,deathTimer){
  this.damage = damage;
  this.rec = rec;
  this.alive = 0;
  this.deathTimer = deathTimer;
}

let w = new weapon(10,weaponsSP[0],10);

let g = new weapon(90,weaponsSP[1],10);




console.log(w);
console.log(g);


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


        stage.update();
    }

    function startGame() {
      //This function is to start the Game
      console.log("Game Started");

      updateScores(3);

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
