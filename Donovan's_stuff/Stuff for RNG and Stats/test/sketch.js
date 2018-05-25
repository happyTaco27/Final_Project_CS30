//Donovan Godthjaelpsen
//10,5,18
//testing for RNG and stats (S.P.E.C.I.A.L) V.0.0.1
let playerBonus=[];
let softSkillsPoints;
let exp,lvl,currentExp,expEarned,expToLevelUp;
let s,p,e,c,i,a,l;
let aiS,aiP,aiE,aiC,aiI,aiA,aiL;
let special;
let aiSpecial;
let ifInventoryIsOpen=false;
let d20;
let counter;
lvl=1;
exp=0;
softSkillsPoints=5;

function setup() {
  createCanvas(windowWidth, windowHeight);
  //setting starting exp
  exp=0;
  //base level exp requirements
  expToLevelUp=10;
  //Stats for Players
  special=[s,p,e,c,i,a,l];
  //Stats for ai
  aiSpecial=[aiS,aiP,aiE,aiC,aiI,aiA,aiL];
  makingStats();
  statCheck();

  print("--------------------------------------------------------");
  print("Player's Stats:");
  print("Exp:",exp,"/ ",expToLevelUp," Level: ",lvl);
  print("S:",s," P:",p," E:",e," C:",c," I:",i," A:",a," L:",l);
  print("Soft Skill Point Remaining:",softSkillsPoints);
  print("--------------------------------------------------------");
  print("Ai's Stats:");
  print("S:",aiS," P:",aiP," E:",aiE," C:",aiC," I:",aiI," A:",aiA," L:",aiL);
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
function draw() {
  levelUp();
  background(255);
  if(mouseIsPressed){
    exp++;
  }
}
function dice20(){
  d20=round(random(20));
}
function statCheck(){
  for(let x=0;x<aiSpecial.length;x++){
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
    print("S:",s," P:",p," E:",e," C:",c," I:",i," A:",a," L:",l);
    print("Current Soft Skill Points:",softSkillsPoints);
  }
}
//haven't found a use for this yet
function stats()  {
}
function enemyStats() {

}
function makingStats()  {
  s=round(random(20));
  p=round(random(20));
  e=round(random(20));
  c=round(random(20));
  i=round(random(20));
  a=round(random(20));
  l=round(random(20));
  aiS=round(random(20));
  aiP=round(random(20));
  aiE=round(random(20));
  aiC=round(random(20));
  aiI=round(random(20));
  aiA=round(random(20));
  aiL=round(random(20));
}
