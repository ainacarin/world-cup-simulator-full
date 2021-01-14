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
/*     const result = [];
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
    return result; */
  }

  function getWinnerNameResult(result) {
/*     if (result.localResult > result.visitResult) {
      return result.localTeam;
    } else if (result.localResult < result.visitResult) {
      return result.visitTeam;
    } else {
      return null;
    }  */
  }

  export const getWinnerTeamNameResult= function(teamA, teamB, matchSummaryResults, resultsBeforeMatchesDays) {
/*     const resultFiltered = searchResultMatch(teamA, teamB, matchSummaryResults);
    if (resultFiltered.length > 0) {
      return getWinnerNameResult(resultFiltered);
    } else {
      const found = false;
      for (const i = 0; i < this.summaries.length && found == false; i++) {
        const summary = this.summaries[i];
        resultFiltered = searchResultMatch(teamA, teamB, summary);
        if (result.length > 0) {
          found = true;
        }
      }
      return getWinnerNameResult(resultFiltered);
    }  */
    return null;
  }
