// SCALING OPTIONS
// scaling can have values as follows with full being the default
// "fit"    sets canvas and stage to dimensions and scales to fit inside window size
// "outside"    sets canvas and stage to dimensions and scales to fit outside window size
// "full"    sets stage to window size with no scaling
// "tagID"    add canvas to HTML tag of ID - set to dimensions if provided - no scaling

var scaling = "fit"; // this will resize to fit inside the screen dimensions
var width = 1024;
var height = 768;
var color = silver;
var outerColor = silver;


//Loading in assets in const variables
const assets = ["isle.jpg", "pic1.jpg", "pic2.jpg", "pic3.jpg"];
const path = "assets/";

//adding asset and path to frame parameters to be loaded in.
var frame = new Frame(scaling, width, height, color, outerColor, assets, path);
frame.on("ready", function() {
    zog("ready from ZIM Frame"); // logs in console (F12 - choose console)

    const stage = frame.stage;
    const stageW = frame.width;
    const stageH = frame.height;

    // VARIABLES
    let floor1difficulty; 
    let floor2difficulty;
    let floor3difficulty;

    // PART 1 [10]
    // Load the island backing image and title
    // (no variables)

    gameMenu();
    function gameMenu() {
        // This fucntion is for the game menu State
        
        //start Game
        startGame() 
        
        
    }

    function startGame() {
      //This function is to start the Game
      console.log("Game Started")
      startGameTimer();
      startPointsCounter();
      loadAssets();//load character and assets. Chache background
      startLevel1();
      startLevel2();
      startLevel3();

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


    function startLevel2(){
        //adjust speed, amount of bullets, and damaged to level3 setting based on time game has been running for 

        floor1difficulty = 3; //maybe random difficulty
        floor2difficulty = 1;
        floor3difficulty = 4;

    }


    function endGame() {

    }
    
    
   

    stage.update(); // this is needed to show any changes

});
