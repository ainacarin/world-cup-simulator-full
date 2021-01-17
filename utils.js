export const shuffle = Array.prototype.shuffle = function () {
    var i = this.length;
    while (i) {
      var j = Math.floor(Math.random() * i);
      var t = this[--i];
      this[i] = this[j];
      this[j] = t;
    }
    return this;
  };

export const generateResultGoals = function() {
    return Math.round(Math.random() * 10);
  }

  function searchResultMatch(teamA, teamB, results) {
    let result = results.filter(
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

  function getWinnerNameResult(result) {
    if (result[0].localResult > result[0].visitResult) {
      return result[0].localTeam;
    } else if (result[0].localResult < result[0].visitResult) {
      return result[0].visitTeam;
    } else {
      return null;
    } 
  }

  export const getWinnerTeamNameResult = function(teamA, teamB, matchSummaryResults, resultsBeforeMatchesDays) {
    let result = searchResultMatch(teamA, teamB, matchSummaryResults);
    if(result.length == 0) {
      let found = false;
      for(let i = 0; i < resultsBeforeMatchesDays.length && found == false; i++) {
        const res = resultsBeforeMatchesDays[i];
        result = searchResultMatch(teamA, teamB, res);
        if(result.length > 0){
          found = true;
        }
      }
    }
    if(result.length == 0) {
      return null;
    } else {
      return getWinnerNameResult(result);
    }
  }
