/* import { nameWorldCup, config } from './config.js'
import { worldTeams, titlesPlayOff } from './data.js'
import WorldCupSimulator from "./classes/PlayOff.js"; */

import { nameWorldCup, config } from './config.js'
import { worldTeams, titlesPlayOff, groupsNames, JORNADA, LOCAL_TEAM, VISIT_TEAM } from './data.js'
/* import WorldCupSimulator from "./classes/GroupsPhase_01.js"; */
import WorldCupSimulator from "./classes/GroupPhase.js";
import Group from './classes/Group.js';
import GroupPhase from './classes/GroupPhase.js';

/* VARIABLES */
let winnerWorldCup = '';



const groupsPhase = new WorldCupSimulator(nameWorldCup, worldTeams, config);
//Muestra título de campeonato
console.log(groupsPhase.name);
//Muestra grupos con equipos participantes
groupsPhase.configSchedulesMatchDays();
groupsPhase.groups.forEach(group => {
  console.log();
  console.log(`Grupo ${group.name}`);
  console.log('-----------------------')
  group.teams.forEach(team => console.log(team.name));
  let indexMatch = 1;
  group.matchScheduleDay.forEach(match => {
    console.log();
    console.log(`JORNADA ${indexMatch}`);
    match.forEach(matchDay => {
      console.log(`- ${matchDay[LOCAL_TEAM]} vs ${matchDay[VISIT_TEAM]}`);
    })
    indexMatch++;
  })
});
groupsPhase.start();


/* for (const team of groupsPhase.teams) {
  console.log(team)
}
console.log(groupsPhase.config)
console.log(groupsPhase.groups)
for (const group of groupsPhase.groups) {
  console.log('GROUP',group.name)
  for (const team of group.teams) {
    console.log(team)
  }
  for (const scheduleMatchDay of group.matchScheduleDay) {
    console.log(scheduleMatchDay);
  }
} */


/* console.log(groupsPhase.name);
console.log(groupsPhase.teams);
console.log(groupsPhase.totalDataGroupsPhase);
for(let i = 0; i < groupsPhase.totalDataGroupsPhase.length; i++) {
  console.log('Group',groupsPhase.totalDataGroupsPhase[i]);
} */

/*
 //MAIN PROGRAM
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