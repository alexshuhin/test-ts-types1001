import * as R from 'ramda';

declare namespace Match {
  type Event = GoalEvent | CardEvent | AnyEvent

  type GoalEvent = {
    type: 'GOAL'
    gameTime: number,
    team: Team
  }

  type CardEvent = {
    type: 'CARD'
    gameTime: number,
    team: Team
    cardType: CardType
  }

  type AnyEvent = {
    type: string
    gameTime: number,
  }

  type Team = 'HOME' | 'AWAY'

  type CardType = "red" | "yellow"
}

const events: Match.Event[] = [
  { type: 'GOAL', gameTime: 79, team: 'AWAY' },
  { type: 'GOAL', gameTime: 155, team: 'HOME' },
  { type: 'GOAL', gameTime: 225, team: 'HOME' },
  { type: 'PERIOD_END', gameTime: 300 },
  { type: 'GOAL', gameTime: 324, team: 'AWAY' },
  {
    type: 'CARD', gameTime: 347, team: 'AWAY', cardType: 'red',
  },
  {
    type: 'CARD', gameTime: 361, team: 'AWAY', cardType: 'yellow',
  },
  { type: 'GOAL', gameTime: 525, team: 'HOME' },
  { type: 'GOAL', gameTime: 581, team: 'AWAY' },
  { type: 'PERIOD_END', gameTime: 600 },
  { type: 'MATCH_END', gameTime: 600 },
];

const getTeamGoalEvents = (team: Match.Team): (events: Match.Event[]) => Match.Event[] => R.filter(
  R.allPass([
    R.propEq('team', team),
    R.propEq('type', 'GOAL'),
  ]),
);

getTeamGoalEvents('HOME')(events);
