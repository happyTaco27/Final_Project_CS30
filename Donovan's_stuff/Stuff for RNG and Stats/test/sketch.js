//Donovan Godthjaelpsen
//10,5,18
//testing for RNG and stats (S.P.E.T.I.A.L)
let softSkillsPoints;
let exp,lvl,currentExp,expEarned,expToLevelUp;
let s,p,e,t,i,a,l,newS,newP,newE,newT,newI,newA,newL;
let sizeOfSkillTile;
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
}

function draw() {
  levelUp();
}
function statCheck(){
//This is for later when i have hit reg. to test and the stats work as they should
}
function levelUp(){
  //As the name implies, for Character level up and core testing of Stats
  if(exp===expToLevelUp){
    lvl++;
    softSkillsPoints++;
    expToLevelUp=round(expToLevelUp*1.5);
    exp=0;
    print("Exp needed: ",expToLevelUp," Level: ",lvl);
    print("S:",s," P:",p," E:",e," T:",t," I:",i," A:",a," L:",l);
  }
}

function stats()  {
//haven't found a use for this yet
}
//This is for the soft skills and feats
function skillTree()   {
//This is just a place-holder
  let teir1,teir2,teir3,teir4,teir5,teir6;
  let pacifist=[];
  let neutral=[];
  let anarchist=[];

  fill(0);
  rect(0,0,width,height);
}

function keyPressed(){
  //For Skill Tree
  if(keyCode===TAB){
    skillTree();
  }
}
