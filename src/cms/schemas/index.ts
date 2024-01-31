// documents
import player from "./documents/player";
import team from "./documents/team";
import matchDay from "./documents/matchday";
import match from "./documents/match";
import coach from "./documents/coach";
import trending from "./documents/trending";

// objects
import matchStats from "./objects/matchStats";
import matchTeamStats from "./objects/matchTeamStats";
import overallTeamStats from "./objects/overallTeamStats";
import lineup from "./objects/lineup";
import event from "./objects/event";
import matchStatus from "./objects/matchStatus";
import insight from "./documents/insight";
import { SchemaType, SchemaTypeDefinition } from "sanity";

const objects = [
  matchStats,
  matchTeamStats,
  overallTeamStats,
  lineup,
  event,
  matchStatus,
];

const documents = [player, team, matchDay, match, coach, trending, insight];

export const schemaTypes = [...objects, ...documents] as SchemaTypeDefinition[];
