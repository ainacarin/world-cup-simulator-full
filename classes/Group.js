/* import { LOCAL_TEAM, localTeamText, VISIT_TEAM, visitTeamText } from "../data";
 */
import { generateResultGoals } from "../utils.js";

const LOCAL_TEAM = 0;
const localTeamText = "Local Team";
const VISIT_TEAM = 1;
const visitTeamText = "Visit Team";

export default class Group {
  constructor(name, teams, config) {
    this.name = name;
    this.teams = [];
    this.summaries = [];
    this.config = {};
    this.matchScheduleDay = [];
    this.setup(teams, config);
  }

  setup(teams, config) {
    this.teams = teams;
    this.config = config;
  }

  initRound() {
    const numberMatchDays = this.teams.length - 1;
    const numberMatchesPerMatchDays = this.teams.length / 2;
    for (let iMatchDays = 0; iMatchDays < numberMatchDays; iMatchDays++) {
      const matchDay = [];
      for (
        let iMatchesPerMatchDays = 0;
        iMatchesPerMatchDays < numberMatchesPerMatchDays;
        iMatchesPerMatchDays++
      ) {
        const match = [];
        match[LOCAL_TEAM] = localTeamText;
        match[VISIT_TEAM] = visitTeamText;
        matchDay.push(match);
      }
      this.matchScheduleDay.push(matchDay);
    }
  }

  setLocalTeamsRound() {
    const maxLocalTeams = this.teams.length - 2;
    let indexTeams = 0;
    for (const match of this.matchScheduleDay) {
      for (const matchDay of match) {
        matchDay[LOCAL_TEAM] = this.teams[indexTeams].name;
        indexTeams++;
        if (indexTeams > maxLocalTeams) {
          indexTeams = 0;
        }
      }
    }
  }

  setVisitTeamsRound() {
    const maxVisitTeams = this.teams.length - 2;
    let indexTeams = maxVisitTeams;
    for (const match of this.matchScheduleDay) {
      for (const matchDay of match) {
        if (match.indexOf(matchDay) == 0) {
          matchDay[VISIT_TEAM] = this.teams[maxVisitTeams + 1].name;
        } else {
          matchDay[VISIT_TEAM] = this.teams[indexTeams].name;
          indexTeams--;
          if (indexTeams < 0) {
            indexTeams = maxVisitTeams;
          }
        }
      }
    }
  }

  invertFirstMatchRound() {
    const initialPosition = 0;
    for (const match of this.matchScheduleDay) {
      if (this.matchScheduleDay.indexOf(match) % 2 != 0) {
        const matchDay = match[initialPosition];
        const visitTeam = matchDay[VISIT_TEAM];
        matchDay[VISIT_TEAM] = matchDay[LOCAL_TEAM];
        matchDay[LOCAL_TEAM] = visitTeam;
      }
    }
  }

  configScheduleMatchDays() {
    for (let i = 0; i < this.config.rounds; i++) {
      this.initRound();
      this.setLocalTeamsRound();
      this.setVisitTeamsRound();
      this.invertFirstMatchRound();
    }
  }

  play(matchDay) {
    const localResult = generateResultGoals();
    const visitResult = generateResultGoals();
    return {
      localTeam: matchDay[LOCAL_TEAM],
      localResult,
      visitTeam: matchDay[VISIT_TEAM],
      visitResult,
    };
  }

  updateTeams(result) {
    const localTeam = this.teams.find((team) => team.name == result.localTeam);
    const visitTeam = this.teams.find((team) => team.name == result.visitTeam);

    if (localTeam && visitTeam) {
      //Update goals
      localTeam.goalsFor += result.localResult;
      visitTeam.goalsFor += result.visitResult;
      localTeam.goalsAgainst += result.visitResult;
      visitTeam.goalsAgainst += result.localResult;
      //Update points
      if (result.localResult > result.visitResult) {
        //win localTeam
        localTeam.points += this.config.pointsPerWin;
        visitTeam.points += this.config.pointsPerLost;
        localTeam.matchesWon += 1;
        visitTeam.matchesLost += 1;
      } else if (result.visitResult > result.localResult) {
        //win visitTeam
        visitTeam.points += this.config.pointsPerWin;
        localTeam.points += this.config.pointsPerLost;
        visitTeam.matchesWon += 1;
        localTeam.matchesLost += 1;
      } else {
        //drawn
        localTeam.points += this.config.pointsPerDrawn;
        visitTeam.points += this.config.pointsPerDrawn;
        localTeam.matchesDrawn += 1;
        visitTeam.matchesDrawn += 1;
      }
    }
  }

  searchResultMatch(teamA, teamB, results) {
    const result = [];
    result = results.filter(
      (result) =>
        result.localTeam == teamA.name && result.visitTeam == teamB.name
    );
    if (result.length == 0) {
      result = results.filter(
        (result) =>
          result.localTeam == teamB.name && result.visitTeam == teamA.name
      );
    }
    return result;
  }

  getWinnerNameResult(result) {
    if (result.localResult > result.visitResult) {
      return result.localTeam;
    } else if (result.localResult < result.visitResult) {
      return result.visitTeam;
    } else {
      return null;
    }
  }

  getWinnerTeamName(teamA, teamB, matchSummaryResults, summaries) {
    const resultFiltered = [];
    resultFiltered = this.searchResultMatch(teamA, teamB, matchSummaryResults);
    if (resultFiltered.length > 0) {
      return this.getWinnerNameResult(resultFiltered);
    } else {
      const found = false;
      for (const i = 0; i < this.summaries.length && found == false; i++) {
        const summary = this.summaries[i];
        resultFiltered = this.searchResultMatch(teamA, teamB, summary);
        if (result.length > 0) {
          found = true;
        }
      }
      return this.getWinnerNameResult(resultFiltered);
    }
  }

  calculateStandings(matchSummaryResults, summaries) {
    this.teams.sort(function (teamA, teamB) {
      //points
      if (teamA.points > teamB.points) {
        return -1;
      } else if (teamA.points < teamB.points) {
        return 1;
      } else {
        //match: teamA vs teamB
        if (teamA.points == teamB.points) {
          const winnerNameMatch = this.getWinnerTeamName(
            teamA,
            teamB,
            matchSummaryResults,
            summaries
          );
          if (winnerNameMatch == teamA.name) {
            return -1;
          } else if (winnerNameMatch == teamB.name) {
            return 1;
          } else if (winnerNameMatch == null) {
            //goals
            const goalsDiffA = teamA.goalsFor - teamA.goalsAgainst;
            const goalsDiffB = teamB.goalsFor - teamB.goalsAgainst;
            if (goalsDiffA > goalsDiffB) {
              return -1;
            } else if (goalsDiffA < goalsDiffB) {
              return 1;
            } else {
              //alphabetic sort
              if (teamA.name > teamB.name) {
                return 1;
              } else if (teamA.name < teamB.name) {
                return -1;
              } else {
                return 0;
              }
            }
          }
        }
      }
    });
    console.log(this.teams);
  }

  start() {
    this.matchScheduleDay.forEach((match) => {
      const matchSummary = {
        results: [],
        standings: [],
      };
      //Results
      match.forEach((matchDay) => {
        const result = this.play(matchDay);
        this.updateTeams(result);
        matchSummary.results.push(result);
      });
      //Standings
      /*       this.calculateStandings(matchSummary.results, this.summaries); */
      this.summaries.push(matchSummary);
    });
  }
}
