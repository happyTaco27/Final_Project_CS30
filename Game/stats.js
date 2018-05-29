//Donovan Godthjaelpsen
//10,5,18
//testing for RNG and stats (S.P.E.C.I.A.L) V.0.2

lvl=1;
exp=0;
softSkillsPoints=5;

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
