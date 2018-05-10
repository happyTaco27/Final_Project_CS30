//Donovan Godthjaelpsen
//10,5,18
//testing for RNG and stats (S.P.E.T.I.A.L)
let exp,lvl,currentExp,expEarned,expToLevelUp;
let s,p,e,t,i,a,l,newS,newP,newE,newT,newI,newA,newL;
newS=s;
newP=p;
newE=e;
newT=t;
newI=i;
newA=a;
newL=l;
lvl=1;
exp=0;
function setup() {
  createCanvas(windowWidth, windowHeight);
  expToLevelUp=10;
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

}
function levelUp(){
  if(exp===expToLevelUp){
    lvl++;
    expToLevelUp=round(expToLevelUp*1.5);
    exp=0;
    print("Exp needed: ",expToLevelUp," Level: ",lvl);
    print("S:",s," P:",p," E:",e," T:",t," I:",i," A:",a," L:",l);
  }
}
function stats(){

}
