//stat calculator
let s,p,e,t,i,a,l;
let s1,p1,e1,t1,i1,a1,l1;
let bonus,playerN,aiN;
let playerRole,aiRole;


// let sCheck,pCheck,eCheck,tCheck,iCheck,aCheck,lCheck;
class StatCheck {
  constructor() {
    this.playerRole;
    this.aiRole;
  }
  d20(){
    let roll=round(random(20));
    print("Thing");
    return roll;

  }
  skillCheck(n){
    if(n<5){
      bonus= -1;
    }
    else if(n<10){
      bonus=1;
    }
    else if(n<15){
      bonus=2;
    }
    else if(n<20){
      bonus=3;
    }
    else if(n===20){
      bonus=4;
    }
  }
  aiSkillCheck(n){
    if(n<5){
      bonus= -1;
    }
    else if(n<10){
      bonus=1;
    }
    else if(n<15){
      bonus=2;
    }
    else if(n<20){
      bonus=3;
    }
    else if(n===20){
      bonus=4;
    }
  }
  // checkingIfPlayersRoleIsbetter(){
  //   if(playerRole+playerN<aiRole+aiN){
  //
  //   }
  // }
}
class Health {
  constructor() {
    this.playerVal;
    this.aiVal;

  }
}
