//Donovan Godthjaelpsen
//10,5,18
//testing for RNG and stats (S.P.E.C.I.A.L) V.0.0.1
let softSkillsPoints;
let exp,lvl,currentExp,expEarned,expToLevelUp;
let s,p,e,c,i,a,l,newS,newP,newE,newC,newI,newA,newL;
let aiS,aiP,aiE,aiC,aiI,aiA,aiL;
let sizeOfSkillTile;
let ifInventoryIsOpen=false;
let d20;
let counter;
sizeOfSkillTile=100;
newS=s;
newP=p;
newE=e;
newC=c;
newI=i;
newA=a;
newL=l;
lvl=1;
exp=0;
softSkillsPoints=5;

function setup() {
  createCanvas(windowWidth, windowHeight);
  //setting counter
  counter=0;
  //setting starting exp
  exp=0;
  //base level exp requirements
  expToLevelUp=10;
  //core Stats
  makingStats();
  print("--------------------------------------------------------");
  print("Player's Stats:");
  print("Exp:",exp,"/ ",expToLevelUp," Level: ",lvl);
  print("S:",s," P:",p," E:",e," C:",c," I:",i," A:",a," L:",l);
  print("Soft Skill Point Remaining:",softSkillsPoints);
  print("--------------------------------------------------------");
  print("Ai's Stats:");
  print("S:",aiS," P:",aiP," E:",aiE," C:",aiC," I:",aiI," A:",aiA," L:",aiL);
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
function statCheck(x,aiX){
  if(x<aiX){
    return x--;
  }
  if(x===aiX){
    return x;
  }
  if(x>aiX){
    return x++;
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
// function mouseIsPressed(){
//   if (mouseIsPressed){
//     exp++;
//   }
// }
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
