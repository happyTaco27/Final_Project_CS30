//Donovan Godthjaelpsen
//10,5,18
//testing for RNG and stats (S.P.E.T.I.A.L)
let softSkillsPoints;
let exp,lvl,currentExp,expEarned,expToLevelUp;
let s,p,e,t,i,a,l,newS,newP,newE,newT,newI,newA,newL;
let sizeOfSkillTile;
let ifInventoryIsOpen=false;
let d20;
sizeOfSkillTile=100;
newS=s;
newP=p;
newE=e;
newT=t;
newI=i;
newA=a;
newL=l;
lvl=1;
exp=0;
softSkillsPoints=5;

function setup() {
  createCanvas(windowWidth, windowHeight);
  //base level exp requirements
  expToLevelUp=10;
  //core Stats
  s=round(random(20));
  p=round(random(20));
  e=round(random(20));
  t=round(random(20));
  i=round(random(20));
  a=round(random(20));
  l=round(random(20));
  print("S:",s," P:",p," E:",e," T:",t," I:",i," A:",a," L:",l);
  print("Soft Skill Point Remaining:",softSkillsPoints);
  (document).on("keypress", function(event) {
    if (event.keyCode === 9) {   //tab pressed
      return false; // stops its action
    }
  });
}
function draw() {
  levelUp();
  skillTree();
  background(255);
}
function statCheck(){
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
    print("Exp needed: ",expToLevelUp," Level: ",lvl);
    print("S:",s," P:",p," E:",e," T:",t," I:",i," A:",a," L:",l);
    print("Current Soft Skill Points:",softSkillsPoints);
  }
}
//haven't found a use for this yet
function stats()  {
}
//This is for the soft skills and feats
function skillTree()   {
  let teir1,teir2,teir3,teir4,teir5,teir6;
  let pacifist=[];
  let neutral=[];
  let anarchist=[];
  fill(0);
  rect(0,0,width,height);
}
// key binds
function keyPressed(){
  if(keyCode===TAB){
    skillTree();
  }
}
