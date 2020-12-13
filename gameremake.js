//gameremake.js
var scaling = "fit"; // this will resize to fit inside the screen dimensions
var width = 1024;
var height = 768;
var color = white;
var outerColor = silver;
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

  function spawnPoint(rec,pos){
    this.rec = rec;
    this.pos = pos;
  }

  const weaponsSP =
    [new Rectangle(40,20,black).pos(0,120),
    new Rectangle(40,20,black).pos(stageW - 40,(stageH/6)),
    new Rectangle(40,20,black).pos(0,(stageH/6)+ stageH/3),
    new Rectangle(40,20,black).pos(stageW - 40,(stageH/6)+ stageH/3),
    new Rectangle(40,20,black).pos(0,(stageH/6)+ stageH/3+ stageH/3),
    new Rectangle(40,20,black).pos(stageW - 40,(stageH/6)+ stageH/3 + stageH/3)];

  let sp0 = new spawnPoint(weaponsSP[0],0);
  let sp1 = new spawnPoint(weaponsSP[1],1);
  let sp2 = new spawnPoint(weaponsSP[2],2);
  let sp3 = new spawnPoint(weaponsSP[3],3);
  let sp4 = new spawnPoint(weaponsSP[4],4);
  let sp5 = new spawnPoint(weaponsSP[5],5);
  let sp = [sp0,sp1,sp2,sp3,sp4,sp5];

  //left and right handedness for if cannonpositions true = left, false = right
  const lrHand = [true, false, true, false, true, false];

  function weapon(damage,rpos,deathTimer,minSpeed,maxSpeed){
    this.damage = damage;
    this.rec = null;//weaponsSP[rpos];
    this.deathTimer = deathTimer;
    this.spawntime = 5;
    this.active = false;
    this.timeInactive = 0;
    this.timeActive = 0;
    this.minSpeed = minSpeed;
    this.maxSpeed = maxSpeed;
    this.originalValue = rpos;
    //yes i know i can just use modulo and rpos but aint got time to be fancy with math
    this.lrHand = lrHand[rpos];

    //this.bulletsAlive = false;
  }
  let debugColorArray = ["lightblue","blue","orange","red","green","brown","black"];
  let peashooter = new weapon(10,0,45,3,1);
  let rifle = new weapon(90,1,5,4,3);
  let multicannon = new weapon(8,2,10,3,3);
  let flamer = new weapon(5,3,3,1,1);
  let railgun = new weapon(20,4,5,1,1);
  let arcrifle = new weapon(3,5,8,1,1);
  let weaponsList = [peashooter, rifle, multicannon, flamer, railgun, arcrifle];

  //ok so we have 3 rows with 2 coloms where weapons can spawn
  //we want weapons to die and respawn after a certin time, so a weapon can live for say 30 secons and it takes 10 seconds to respawn to give the user some respit
  //we want two arrays, one for the weapons in use and one for the weapons out of use
  let weaponsActive = [];
  let weaponsInactive = [weaponsList[0],weaponsList[1],weaponsList[2],weaponsList[3],weaponsList[4],weaponsList[5]];
  //zog(weaponsActive);
  zog(weaponsInactive);

  //we then want to account for what room positions (the rows and cols) do and dont have weapons on them
  //let posActive = [];
  //let posInactive = [sp[0],sp[1],sp[2],sp[3],sp[4],sp[5]];
  let posIa = [0,1,2,3,4,5];
  let posA = [];
  function generateInitalSpawns(){
    //find the starting positions for each weapon
    //itterte through all the weapon positions
    for (let i = 0; i < 6; i++){
      //get a random array position
      let x = rand(0,posIa.length-1);
      //i then need to look into that arrays pos
      posIa[x];
      weaponsList[i].originalValue = sp[posIa[x]].pos;
      weaponsList[i].rec = sp[posIa[x]].rec;
      weaponsList[i].lrHand = lrHand[posIa[x]];
      posA.push(posA[x]);
      removeItemOnce(posIa,posIa[x]);
      zog(weaponsList[i].originalValue);
    }
  }
generateInitalSpawns();

setInterval(shootWeapons,2500);
function shootWeapons(){
  if (peashooter.active == true){
    shootPeashooter();
  }
  if (rifle.active == true){
    shootRife();
  }
  if (multicannon.active == true){
    shootmultiCannon();
  }
  if (flamer.active == true){
    shootFlamer(true);
  }
  else{
    shootFlamer(false);
  }
  if (railgun.active == true){
    shootRailgun();
  }
  if (arcrifle.active == true){
    shootArcRifle(true);
  }else {
    shootArcRifle(false);
  }
}


//zog(weaponsList);
//zog(posInactive);
//zog(posActive);
  //run the updateWeapons Function every second
  setInterval(updateWeapons,1000);
  //using these to track the times weapons and spawn points come in and out of use
  let debug1 = 0;
  let debug2 = 0;
  //we then want to take weapons that respawn and put them into those freed up room positions, and we want to take the weapons that die and remove them
  function updateWeapons(){
    //this check allows us to see if all the weapons are active or not
    //this function triggers every second by default
    //zog("im triggered");

    //itterate through the weapons list
    for (var i = 0; i < 6; i++){
      //check if the weapons active
      if(weaponsList[i].active == false){
        //if the checked weapon is not available increment time
        weaponsList[i].timeInactive += 1;
        //check to see if the timeInactive is equal to the spawn time
        if (weaponsList[i].timeInactive == weaponsList[i].spawntime){
          //if this is true then its time to spawn the items but also flip the bits
          weaponsList[i].timeInactive = 0; //reset the counter
          weaponsList[i].active = true; //flip the bit
          //this chunk of code exists in randomlyplaceweapons
          //posActive.push(y);
          //posA.push();
          //removeItemOnce(posInactive,y);

          //weaponsActive.push(w); ////make this weapon active, and account for it
          //time to remove this weapon from the list

          //removeItemOnce(weaponsInactive,w);
          //debug2 ++;
          randomlyplaceweapons(weaponsList[i],i);
          weaponsList[i].rec.animate({props:{color:debugColorArray[weaponsList[i].originalValue]},time:2});

        }//end of nested if
      }//end of original if
      //else if there is an alive item check to see how long its been alive for, if its been alive longer than its life timer then kill it
      else if (weaponsList[i].active == true){
        weaponsList[i].timeActive += 1;
        if (weaponsList[i].timeActive == weaponsList[i].deathTimer){
          weaponsList[i].timeActive = 0;
          weaponsList[i].active = false;

          //THIS MAY NOT WORK
          posIa.push(weaponsList[i].originalValue);
          removeItemOnce(posA,weaponsList[i].originalValue)
          //posInactive.push(weaponsSP[i].originalValue); //I THINK THIS MAY BE THE ISSUE it should not be i, because i is the value of the weapons were itterating through, not the OV of that
          weaponsList[i].originalValue = 6;
          //removeItemOnce(weaponsActive,i);
          //removeItemOnce(posActive,weaponsSP[i].originalValue);
          weaponsList[i].rec.animate({props:{color:debugColorArray[weaponsList[i].originalValue]},time:2});
        }//end of nested esleif
      }//end of original elseif
      zog(weaponsList[i].active);
      zog(weaponsList[i].originalValue);
    }//end for
  stage.update();

  zog("positions in use");
  zog(posA);
  zog("positions out of use");
  zog(posIa);
    /*
  zog("weapons in use");
  zog(weaponsActive);
  zog("weapons out of use");
  zog(weaponsInactive);
  zog("set ended");

  zog(debug1);
  zog(debug2);
*/
}//end func

function randomlyplaceweapons(weapon,w){
  //zog(posInactive);
  //for this method to trigger there will be inactive positions
  //ok so get a random position out of the viable positions
  if (posIa.length == 0){

  }
  else {
    let x = rand(0,posIa.length-1);
    posIa[x];
    weapon.originalValue = sp[posIa[x]].pos;
    weapon.rec = sp[posIa[x]].rec;
    weapon.lrHand = lrHand[posIa[x]];
    posA.push(posA[x]);
    removeItemOnce(posIa,posIa[x]);

    //weaponsActive.push(w); ////make this weapon active, and account for it
    //time to remove this weapon from the list

    //removeItemOnce(weaponsInactive,w);
    //debug2 ++;
  }
}

function removeItemOnce(arr, value) {
  var index = arr.indexOf(value);
  if (index > -1) {
    arr.splice(index, 1);
  }
  return arr;
}
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
    flames.pos(1000,1000);
  }
}
shootFlamer(true);

//I jacked this right from the zim website, i cannot figure out how to get keyboards to work without all these labels, and keyboard show zzz
// create Labels to capture the text from the keyboard
var text1 = new Label({text:"", backgroundColor:white}).pos(1000,1000);
var text2 = new Label({text:"", backgroundColor:white}).pos(1000,2000);

// create a new Keyboard and pass in the labels as an array
// or if just one label, then pass in the label
var keyboard = new Keyboard([text1, text2]);

var playerCircle = new Circle(10,blue).center();
// if just the letter is needed use the keydown event

var movespeed = 15;

keyboard.on("keydown", function(e) {
   zog(e.letter);
   if (e.letter == "a"){
     playerCircle.x -= movespeed;
   }
   else if (e.letter == "d"){
     playerCircle.x += movespeed;
   }
   //i want a thing where holding W longer then releacing makes you jump higher, and i want a collision check so you cant press it again until you hit the ground, and also i want a constant falling effect on the player until they hit that collision check refrenced above!
   else if (e.letter == "w"){
     playerCircle.y -= movespeed;
   }
   //ok so i dont really want s to move you down, in the future ill fix this
   //i want s to, when the player hits a certin spot that spawns on the black seperators they can press S and jump down or press W and jump up
   else if (e.letter == "s"){
     playerCircle.y += movespeed;
   }
});
function activate(e) {
   keyboard.show();
   // remove the events when keyboard is active
   text1.off("mousedown", text1Event);
   text2.off("mousedown", text2Event);
}
keyboard.show().pos(10000,10000); // optionally show the keyboard to start

function shootRailgun(){
  //so for the railgun i want a weapon that will target the players current course and shoot in its direction
  //spawn new polygon, animate it across the screen

  //so this does not quite work because it animates to the players location not past them.
  if (railgun.lrHand == true){
    bullets.push(new Circle(10,red).pos(railgun.rec.x,railgun.rec.y).animate({props:{x:playerCircle.x, y:playerCircle.y},time:{min:railgun.minSpeed, max:railgun.maxSpeed}, ease:"linear"}));

    //attach two hitboxes, hit tests are what i think they are called
    //for the first hit box if it comes into contact with the player destory bullet and have the player take damage
    //for the second hit box if it comes into contact with a screen boundry destroy the bullet, this way if the player dodges forever the computer wont crash
    }
    else if (railgun.lrHand == false){
      bullets.push(new Circle(10,red).pos(railgun.rec.x,railgun.rec.y).animate({props:{x:playerCircle.x, y:playerCircle.y},time:{min:railgun.minSpeed, max:railgun.maxSpeed}, ease:"linear"}));

      //attach two hitboxes, hit tests are what i think they are called
      //for the first hit box if it comes into contact with the player destory bullet and have the player take damage
      //for the second hit box if it comes into contact with a screen boundry destroy the bullet, this way if the player dodges forever the computer wont crash
  //then after a visual image of where this railgun is about to shoot appears (like a lazer beam) fire a fast moving bullet at the player
  }
}
shootRailgun();

var sink;
var lightning;
var arcIO;
function shootArcRifle(b){
  //so for the arcRifle i want a weapon that will direct a particle emitter to where the player is moving
  arcIO = b;
  if (arcIO == true){
    if (arcrifle.lrHand == true){
      lightning = new Emitter({
         obj:[
            new Circle(8,null,darker,2),
            new Circle(7,null,darker,2),
            new Circle(6,null,darker,2),
         ],
         random:{color:["blue", blue, "white", white, yellow, "yellow"]},
         interval:.02, // default
         life:4,
         decayTime:4, // default
         sink:sink,
         sinkForce:.6,
         gravity:0,
         force:1,
         cache:mobile(), // default
       })
          .pos(arcrifle.rec.x-100, arcrifle.rec.y-150)
          .sca(2);
    }
    else if (arcrifle.lrHand == false){
      lightning = new Emitter({
         obj:[
            new Circle(8,null,darker,2),
            new Circle(7,null,darker,2),
            new Circle(6,null,darker,2),
         ],
         random:{color:["blue", blue, "white", white, yellow, "yellow"]},
         interval:.02, // default
         life:4,
         decayTime:4, // default
         sink:playerCircle,
         sinkForce:.6,
         gravity:0,
         force:1,
         cache:mobile(), // default
      })
         .pos(arcrifle.rec.x-150, arcrifle.rec.y-150)
         .sca(2);

    }

    //todo add a collision check to these circles, if they hit the player destroy them and the player takes damage also if they hit the boundry box, destroy the colided particle
  }
  else if (arcIO == false){
    lightning.pos(1000,1000);
  }
}
shootArcRifle(true);

  startGame();

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
  }

  stage.update(); // this is needed to show any changes
});
