import { shuffle } from '../utils.js'
import { groupsNames } from '../data.js'

export default class GroupsPhase {
  constructor(name, teams = [], config = {}) {
    this.name = name;
    this.teams = [];
    this.config = {};
    this.teamsPerGroup = teams.length / groupsNames.length;
    this.setup(teams, config);
    this.totalDataGroupsPhase = [];
    /*         this.totalDataPlayOff = []; */
  }

  setupConfig(config) {
    const defaultConfig = { rounds: 1 };
    this.config = Object.assign(defaultConfig, config);
  }

  customizeGroup(teams) {

  }

  customizeTeam(teamName, group) {
    return {
      name: teamName,
      group: group,
      points: 0,
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

  setup(teams, config) {
    this.setupTeams(teams);
    this.setupConfig(config);
  }


}
