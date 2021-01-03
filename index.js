/* import { nameWorldCup, config } from './config.js'
import { worldTeams, titlesPlayOff } from './data.js'
import WorldCupSimulator from "./classes/PlayOff.js"; */

import { nameWorldCup, config } from './config.js'
import { worldTeams, titlesPlayOff } from './data.js'
import WorldCupSimulator from "./classes/GroupsPhase.js";


/* VARIABLES */
let winnerWorldCup = '';



const groupsPhase = new WorldCupSimulator(nameWorldCup, worldTeams, config);
console.log(groupsPhase.name);
console.log(groupsPhase.teams);

/* //MAIN PROGRAM
const playOff = new WorldCupSimulator(nameWorldCup, worldTeams, config);
playOff.start();

//DISPLAY
console.log('');
console.log(`${playOff.name}`);
console.log('==============================================');
console.log('==== COMIENZO DE LA FASE DE ELIMINATORIAS ====');
console.log('==============================================');
for (let i = 0; i < playOff.totalDataPlayOff.length; i++) {
  console.log('');
  console.log(`==== ${titlesPlayOff[i]} ====`);
  for (const match of playOff.totalDataPlayOff[i]) {
    let winnerTeam = match.localTeam;
    if (match.resultLocalTeam < match.resultVisitTeam) {
      winnerTeam = match.visitTeam;
    }
    console.log(`${match.localTeam} ${match.resultLocalTeam} - ${match.visitTeam} ${match.resultVisitTeam} => ${winnerTeam}`);
    winnerWorldCup = winnerTeam;
  }
}
console.log('');
console.log('');
console.log('===============================================');
console.log(`¡${winnerWorldCup} campeón del mundo!`);
console.log('==============================================='); */