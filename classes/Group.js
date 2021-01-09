
export default class Group {

    constructor(name, teams, config) {
        this.name = name,
        this.teams = [],
        this.config = {},
        this.matchScheduleDay = [],
        this.summaries = [],
        this.setup(teams, config);
    }

    setup(teams, config) {
        this.teams = teams,
        this.config = config
    }

}