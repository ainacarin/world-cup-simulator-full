import { shuffle } from '../utils.js'
import { groupsNames } from '../data.js'
import FootballLeague from './PointsBasedLeague.js'

export default class GroupsPhase {
  constructor(name, teams = [], config = {}) {
    this.name = name;
    this.teams = [];
    this.teamsNames = [];
    this.config = {};
    this.teamsPerGroup = teams.length / groupsNames.length;
    this.totalDataGroupsPhase = [];
    this.setup(teams, config);
    /*         this.totalDataPlayOff = []; */
  }

  setupConfig(config) {
    const defaultConfig = { rounds: 1 };
    this.config = Object.assign(defaultConfig, config);
  }

  customizeGroup(nameGroup, group, teams) {
    return {
      name: nameGroup,
      group: group,
      teams: teams,

    }
  }

  customizeTeam(teamName, group) {
    return {
      name: teamName,
      group: group,
/*       points: 0, */
      matchesWon: 0,
      matchesDrawn: 0,
      matchesLost: 0,
    };
  }

  setupTeams(teams) {
    teams.shuffle();
    const teamsPerGroup = teams.length / groupsNames.length;
    let indexGroup = 0;
    let indexTeamsPerGroup = 0;
    for (const team of teams) {
      if (indexTeamsPerGroup == teamsPerGroup) {
        indexGroup++;
        indexTeamsPerGroup = 0;
      }
      const newTeam = this.customizeTeam(team, groupsNames[indexGroup]);
      indexTeamsPerGroup++;
      this.teams.push(newTeam);
    }
  }

  getTeamsNames(teams) {
    return teams.map(team => team.name);
  }

  setupGroups() {
    for(let i = 0; i < groupsNames.length; i++) {
      const teams = this.teams.filter(team => team.group == groupsNames[i]);
      const teamsNames = this.getTeamsNames(teams);
      const group = new FootballLeague(groupsNames[i], teamsNames, this.config);
      this.totalDataGroupsPhase.push(group);
    }
  }

  startCompetition() {
    
    this.totalDataGroupsPhase.forEach(group =>  {

      group.scheduleMatchDays();

      // Mostramos por pantala las jornadas y sus partidos
      let i = 1
      group.matchDaySchedule.forEach(matchDay => {
          console.log(`JORNADA ${i}`)
          matchDay.forEach(match => {
              const home = match[0] != null ? match[0] : 'DESCANSA'
              const away = match[1] != null ? match[1] : 'DESCANSA'
              console.log(`${home} vs ${away}`)
          })
          i++
      })

      group.start();  
      // mostrar por pantalla los resultados de cada jornada y la clasificación
      i = 1
      group.summaries.forEach(summary => {
          console.log(`RESUMEN JORNADA ${i}`)
          summary.results.forEach(result => {
              console.log(`${result.homeTeam} ${result.homeGoals} - ${result.awayGoals} ${result.awayTeam}`)
          })
          console.table(summary.standings.map(team => {
              return {
                  Team: team.name,
                  Points: team.points,
                  PlayedMatches: team.matchesWon + team.matchesDrawn + team.matchesLost,
                  Won: team.matchesWon,
                  Drawn: team.matchesDrawn,
                  Lost: team.matchesLost,
                  GoalsFor: team.goalsFor,
                  GoalsAgainst: team.goalsAgainst,
                  GoalsDiff: team.goalsFor - team.goalsAgainst
              }
          }))
          i++
      })
    });
  }

  setup(teams, config) {
    this.setupTeams(teams);
    this.setupConfig(config);
    this.setupGroups();
  }


}
