//this is constantly checking if exp requirments are met to level up
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
//holds values for health
function healthPoints() {
}
function displayHealthPoints() {
}
function manaPoints() {
}
function displayManaPoints() {
}
function currentItem() {
}
function displayCurrentItem() {
}
function currentSpell() {
}
function displayCurrentSpell() {
}
