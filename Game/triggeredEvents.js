//This is triggered when the game starts
//This makes the stats for the character and AI (AI's stats are place-holder atm for testing)
function makingStats()  {
  for(let x=0;x<7;x++){
    //Player's stats
    special.push(round(random(20,5)));
    //AI stats
    aiSpecial.push(round(random(15,5)));
  }
}
//This checks what level each special trait is
function buffCheck(){
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

//This is triggered when an AI apears
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
