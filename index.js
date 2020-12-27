import WorldCupSimulator from "./classes/PlayOff.js";

console.log("World Cup Simulator");

const nameWorldCup = "World Cup Spain";
const teams = [
  "1A",
  "1B",
  "1C",
  "1D",
  "1E",
  "1F",
  "1G",
  "1H",
  "1I",
  "1J",
  "1K",
  "1L",
  "1M",
  "1N",
  "1O",
  "1P",
  "1Q",
  "1R",
  "1S",
  "1T",
  "1U",
  "1V",
  "1W",
  "1X",
  "1Y",
  "1Z",
  "2A",
  "2B",
  "2C",
  "2D",
  "2E",
  "2F",
];
const config = { rounds: 1 };
const titlesPlayOff = [
  "OCTAVOS DE FINAL",
  "CUARTOS DE FINAL",
  "SEMIFINALES",
  "TERCER Y CUARTO PUESTO",
  "FINAL",
];

const playOff = new WorldCupSimulator(nameWorldCup, teams, config);
playOff.start();

console.log("NAME COMPETITION", playOff.name);
console.log("TEAMS", playOff.teams);
/* console.log('TOTAL DATA PLAYSOFF',playOff.totalDataPlayOff); */
console.log("TOTAL DATA PLAYSOFF");
for (let i = 0; i < playOff.totalDataPlayOff.length; i++) {
  console.log(`==== ${titlesPlayOff[i]} ${i} ====`);
  for (const match of playOff.totalDataPlayOff[i]) {
    let winnerTeam = match.localTeam;
    if (match.resultLocalTeam < match.resultVisitTeam) {
      winnerTeam = match.visitTeam;
    }
    console.log(
      `${match.localTeam} ${match.resultLocalTeam} - ${match.visitTeam} ${match.resultVisitTeam} => ${winnerTeam}`
    );
  }
}
console.log("WINNERS", playOff.winnersPlayOff);
