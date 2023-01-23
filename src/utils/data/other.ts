export type Sub = {
    off: string,
    on: string,
}

export enum EventType {
    Goal = 'Goal',
    YellowCard = 'Yellow Card',
    RedCard = 'Red Card',
    Substitution = 'Substitution',
    Penalty = 'Penalty',
    OwnGoal = 'Own Goal',
    MissedPenalty = 'Missed Penalty',
    Commentry = 'Commentry',
}


export type TimeType  =  {
    comment:  string ,
    type:  EventType ,
    time:  string ,
    id:  string ,
    scorer?:  string ,
    substitution?:  Sub ,
    image?:  string ,
}

export const timelist = [
    {
        comment: 'Goal by dabagire',
        type: EventType.Goal,
        time: '1',
        id: '1',
        scorer: 'dabagire',
    },
    {
        comment: 'Substiturion John replaces Dabagire',
        type: EventType.Substitution,
        time: '2',
        id: '2',
        substitution: {
            off: 'Dabagire',
            on: 'John',
        },
    },
    {
        comment: 'It looks the game is going to end in a draw',
        type: EventType.Commentry,
        time: '90',
        id: '3',
    },
    {
        comment: 'Goal by dabagire',
        type: EventType.Goal,
        time: '1',
        id: '1',
        scorer: 'dabagire',
    },
    {
        comment: 'Substiturion John replaces Dabagire',
        type: EventType.Substitution,
        time: '2',
        id: '2',
        substitution: {
            off: 'Dabagire',
            on: 'John',
        },
    },
    {
        comment: 'It looks the game is going to end in a draw',
        type: EventType.Commentry,
        time: '90',
        id: '3',
    },
]