export class AddUserEventRequest {
    collectiveEvent: CollectiveEvent;
    custom: Custom | null;
    playerCustom: PlayerCustom | null;
    match: Match | null;
    playerMatch: PlayerMatch | null;
    training: Training | null;
    playerTraining: PlayerTraining | null;

    constructor(collectiveEvent: CollectiveEvent, custom: Custom | null, playerCustom: PlayerCustom | null,
                match: Match | null, playerMatch: PlayerMatch | null, training: Training | null,
                playerTraining: PlayerTraining | null) {
        this.collectiveEvent = collectiveEvent;
        this.custom = custom;
        this.playerCustom = playerCustom;
        this.match = match;
        this.playerMatch = playerMatch;
        this.training = training;
        this.playerTraining = playerTraining;
    }
}

export class CollectiveEvent {
    id: number | undefined;
    type: string | null | undefined;
    location: string;
    date: Date;
    time: string | null | undefined;
    duration: string | null | undefined;
    description: string;

    constructor(type: string | null | undefined, location: string, date: Date,
                time: string | null, duration: null | string, description: string) {
        this.type = type;
        this.location = location;
        this.date = date;
        this.time = time;
        this.duration = duration;
        this.description = description;
    }
}

export class Match {
    team1: string;
    team2: string;
    team1_goals: number | undefined | null;
    team2_goals: number | undefined | null;
    field_format: string;
    result: string;

    constructor(team1: string, team2: string, team1_goals: number | undefined | null,
                team2_goals: number | undefined | null, field_format: string, result: string) {
        this.team1 = team1;
        this.team2 = team2;
        this.team1_goals = team1_goals;
        this.team2_goals = team2_goals;
        this.field_format = field_format;
        this.result = result;
    }
}

export class PlayerMatch {
    goals: number | undefined | null;
    field_time: string | null | undefined;
    role: string | null | undefined;
    assists: number | undefined | null;
    what_liked: string;
    what_disliked: string;
    what_to_improve: string;
    comments: string;

    constructor(goals: number | undefined | null, field_time: null | string,
                role: string | null | undefined, assists: number | undefined | null,
                what_liked: string, what_disliked: string, what_to_improve: string, comments: string) {

        this.goals = goals;
        this.field_time = field_time;
        this.role = role;
        this.assists = assists;
        this.what_liked = what_liked;
        this.what_disliked = what_disliked;
        this.what_to_improve = what_to_improve;
        this.comments = comments;
    }
}

export class Training {
    type: string;
    players_amount: number | undefined | null;
    field_format: string;

    constructor(type: string, players_amount: number | undefined | null, field_format: string) {
        this.type = type;
        this.players_amount = players_amount;
        this.field_format = field_format;
    }
}

export class PlayerTraining {
    goals: number | undefined | null;
    what_liked: string;
    what_disliked: string;
    what_to_improve: string;
    comments: string;

    constructor(goals: number | undefined | null, what_liked: string, what_disliked: string,
                what_to_improve: string, comments: string) {
        this.goals = goals;
        this.what_liked = what_liked;
        this.what_disliked = what_disliked;
        this.what_to_improve = what_to_improve;
        this.comments = comments;
    }
}

export class Custom {
    name: string;

    constructor(name: string) {
        this.name = name;
    }
}

export class PlayerCustom {
    what_liked: string;
    what_disliked: string;
    what_to_improve: string;
    comments: string;

    constructor(what_liked: string, what_disliked: string, what_to_improve: string, comments: string) {
        this.what_liked = what_liked;
        this.what_disliked = what_disliked;
        this.what_to_improve = what_to_improve;
        this.comments = comments;
    }
}