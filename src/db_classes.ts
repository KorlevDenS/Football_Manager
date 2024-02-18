export class UserLogin {
    login: string;
    password: string;

    constructor(login: string, password: string) {
        this.login = login;
        this.password = password;
    }
}

export class UserConfig {
    username: string;
    password: string;
    login: string;
    role: string;
    reg_date: Date;

    constructor(username: string, password: string, login: string,
                role: string, reg_date: Date) {
        this.username = username;
        this.password = password;
        this.login = login;
        this.role = role;
        this.reg_date = reg_date;
    }
}

export class Human {
    id: number | undefined;
    name: string;
    surname: string;
    patronymic: string;
    birthday: Date;
    sex: string;
    passport_id: string;

    constructor(name: string, surname: string, patronymic: string, birthday: Date, sex: string, passport_id: string) {
        this.name = name;
        this.surname = surname;
        this.patronymic = patronymic;
        this.birthday = birthday;
        this.sex = sex;
        this.passport_id = passport_id;
    }
}

export class TrainingAddRequest {
    collectiveEvent: CollectiveEvent;
    training: Training | null;
    playerTraining: PlayerTraining | null;

    constructor(collectiveEvent: CollectiveEvent, training: Training | null, playerTraining: PlayerTraining | null) {
        this.collectiveEvent = collectiveEvent;
        this.training = training;
        this.playerTraining = playerTraining;
    }
}

export class MatchAddRequest {
    collectiveEvent: CollectiveEvent;
    match: Match | null;
    playerMatch: PlayerMatch | null;

    constructor(collectiveEvent: CollectiveEvent, match: Match | null, playerMatch: PlayerMatch | null) {
        this.collectiveEvent = collectiveEvent;
        this.match = match;
        this.playerMatch = playerMatch;
    }
}

export class CustomAddRequest {
    collectiveEvent: CollectiveEvent;
    custom: Custom | null;
    playerCustom: PlayerCustom | null;

    constructor(collectiveEvent: CollectiveEvent, custom: Custom | null, playerCustom: PlayerCustom | null) {
        this.collectiveEvent = collectiveEvent;
        this.custom = custom;
        this.playerCustom = playerCustom;
    }
}

export class ExercisesMatchRequest {
    eventId: number;
    exercisesIds: (number | undefined)[];

    constructor(eventId: number, exercisesIds: (number | undefined)[]) {
        this.eventId = eventId;
        this.exercisesIds = exercisesIds;
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
    id: number | undefined;
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
    id: number | undefined;
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
    id: number | undefined;
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
    id: number | undefined;
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

export class Exercise {
    id: number | undefined;
    title: string;
    technic: string;
    photo: FormData | null;
    video: FormData | null;
    duration: string;
    amount: number;
    muscle_load: string;
    equipment: string;
    min_people: number;
    usage_count: number | undefined;
    date: Date;


    constructor(title: string, technic: string, photo: FormData | null, video: FormData | null, duration: string,
                amount: number, muscle_load: string, equipment: string, min_people: number) {
        this.title = title;
        this.technic = technic;
        this.photo = photo;
        this.video = video;
        this.duration = duration;
        this.amount = amount;
        this.muscle_load = muscle_load;
        this.equipment = equipment;
        this.min_people = min_people;
        this.usage_count = 0;
        this.date = new Date();
    }
}