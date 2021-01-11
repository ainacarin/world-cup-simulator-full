import { shuffle, generateResultGoals } from "../utils.js";
import { groupsNames } from "../data.js";
import Group from './Group.js';
import Team from './Team.js';

export default class GroupPhase {
  constructor(name, teams = [], config = {}) {
    this.name = name;
    this.teams = [];
    this.config = {};
    this.teamsPerGroup = teams.length / groupsNames.length;
    this.groups = [];
    this.setup(teams, config);
    /*         this.totalDataPlayOff = []; */
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
    let indexGroup = 0;
    let indexTeamsPerGroup = 0;
    for (const team of teams) {
      if (indexTeamsPerGroup == this.teamsPerGroup) {
        indexGroup++;
        indexTeamsPerGroup = 0;
      }
      const newTeam = new Team(team, groupsNames[indexGroup]);
      indexTeamsPerGroup++;
      this.teams.push(newTeam);
    }
  }

  getTeamsNames() {
    return this.teams.map(team => team.name);
  }

  setupConfig(config) {
    const defaultConfig = {
      rounds: 1,
      pointsPerWin: 3,
      pointsPerDrawn: 1,
      pointsPerLost: 0,
    };
    this.config = Object.assign(defaultConfig, config);
  }

  setupGroups() {
    for(let i = 0; i < groupsNames.length; i++) {
      const teams = this.teams.filter(team => team.group == groupsNames[i]);
      const group = new Group(groupsNames[i], teams, this.config);
      this.groups.push(group);
    }
  }

  setup(teams, config) {
    this.setupTeams(teams);
    this.getTeamsNames();
    this.setupConfig(config);
    this.setupGroups();
  }

  configSchedulesMatchDays() {
      this.groups.forEach(group => group.configScheduleMatchDays());
  }

  start(){
    this.groups.forEach(group => group.start());
  }
}
