//Donovan Godthjaelpsen
//10,5,18
//testing for RNG and stats (S.P.E.C.I.A.L) V.0.2
let playerBonus=[];
let buff=[];
let softSkillsPoints;
let exp,lvl,currentExp,expEarned,expToLevelUp;
let special;
let aiSpecial;
let ifInventoryIsOpen=false;
let d20;
let counter;
let statBar;
lvl=1;
exp=0;
softSkillsPoints=5;

function preload(){
  statBar=loadImage("images/statusbar.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  //setting starting exp
  exp=0;
  //base level exp requirements
  expToLevelUp=10;
  //Stats for Players
  special=[];
  //Stats for ai
  aiSpecial=[];
  makingStats();
  statCheck();
  buffCheck();

  print("--------------------------------------------------------");
  print("Player's Stats:");
  print("Exp:",exp,"/ ",expToLevelUp," Level: ",lvl);
  print("S:",special[0],"(",buff[0],")"," P:",special[1],"(",buff[1],")"," E:",special[2],"(",buff[2],")"," C:",special[3],
    "(",buff[3],")"," I:",special[4],"(",buff[4],")"," A:",special[5],"(",buff[5],")"," L:",special[6],"(",buff[6],")");
  print("Soft Skill Point Remaining:",softSkillsPoints);
  print("--------------------------------------------------------");
  print("Ai's Stats:");
  print("S:",aiSpecial[0]," P:",aiSpecial[1]," E:",aiSpecial[2]," C:",aiSpecial[3],
    " I:",aiSpecial[4]," A:",aiSpecial[5]," L:",aiSpecial[6]);
  print("--------------------------------------------------------");
  print("Stat Check:");
  print("S:",playerBonus[0]);
  print("P:",playerBonus[1]);
  print("E:",playerBonus[2]);
  print("C:",playerBonus[3]);
  print("I:",playerBonus[4]);
  print("A:",playerBonus[5]);
  print("L:",playerBonus[6]);
  print("--------------------------------------------------------");
}
//Pre-game functions//
//Building stats(AI's stats are placeholder for testing)
function makingStats()  {
  for(let x=0;x<7;x++){
    //Player's stats
    special.push(round(random(20,5)));
    //AI stats
    aiSpecial.push(round(random(15,5)));
  }
}
//Checking if player get's extra stats for each skills
function buffCheck()  {
  for(let x=0;x<7;x++){
    if(special[x]<=5){
      buff.push("-");
    }
    else if(special[x]<=10){
      buff.push(" ");
    }
    else if(special[x]<=15){
      buff.push("+");
    }
    else if(special[x]<=19){
      buff.push("++");
    }
    else if(special[x]===20){
      buff.push("+++");
    }
  }
}
//constat running functions//
function draw() {
  background(255);
  display();
  levelUp();

  if(mouseIsPressed){
    levelUp();
  }
}
function dice20(){
  d20=round(random(20));
}
//Checked when AI is on playing area
function statCheck(){
  for(let x=0;x<7;x++){
    if(special[x]<aiSpecial[x]){
      playerBonus.push("Less");
    }
    else if(special[x]>aiSpecial[x]){
      playerBonus.push("Greater");
    }
    else{
      playerBonus.push("Even");
    }
  }
}
//Game constant check
function levelUp(){
  let lvlUpD20=round(random(20));
  //As the name implies, for Character level up and core testing of Stats
  if(exp===expToLevelUp){
    lvl++;
    expToLevelUp=round(expToLevelUp*1.5);
    exp=0;
    if(round(lvl%3)===0){
      softSkillsPoints++;
    }
    print("Exp:",exp,"/ ",expToLevelUp," Level: ",lvl);
    print("S:",special[0]," P:",special[1]," E:",special[2]," C:",special[3]," I:",special[4]," A:",special[5]," L:",special[6]);
    print("Current Soft Skill Points:",softSkillsPoints);
  }
}
//un-useable at current time
// function skillTree(){
//
// }
function display(){
  image(statBar,0,0);
}
