import { groq } from 'next-sanity';
import { allPlayerFields } from './fields';

export const playersQuery = groq`*[_type == "player"]{
    _id,
    displayName,
    fullName,
    "profile": profile.asset->url,
}`;

export const teamsFootQuery = groq`*[_type == "team" && category == "football"]{
    _id,
    players,
    isOfficial,
    name,
    category,
    "logo": logo.asset->url,
}`;

export const teamsStatsFootQuery = groq`*[_type == "team" && category == "football" && isOfficial==true]{
    _id,
    players,
    isOfficial,
    name,
    "logo": logo.asset->url,
    stats,
}`;

export const teamsStatsQuery = groq`*[_type == "team"]{
    _id,
    players,
    isOfficial,
    name,
    "logo": logo.asset->url,
    stats,
    category,
}`;

export const playersFootQuery = groq`*[_type == "team" && category == "football"]{
    _id,
    name,
    category,
    players[]->{
        _id,
        displayName,
        fullName,
        position,
        "profile": profile.asset->url,
    },
}`;

export const playersByTeamQuery = (id: string) => groq`*[_type== "team" && "_id"==${id}]{
    players[]->{
        _id,
        displayname,
        fullName,
        position,
        "profile": profile.asset->url
    }
} `;

export const playersBaccoQuery = groq`*[_type == "team" && category == "basketball"]{
    _id,
    name,
    category,
    players[]->{
        _id,
        displayName,
        fullName,
        position,
        "profile": profile.asset->url,
    },
}`;

export const playersVolleyQuery = groq`*[_type == "team" && category == "volleyball"]{
    _id,
    name,
    category,
    players[]->{
        _id,
        displayName,
        fullName,
        position,
        "profile": profile.asset->url,
    },
}`;

export const fetchPlayersAllQuery = groq`*[_type == "player"]${allPlayerFields}`;

export const teamsBasketQuery = groq`*[_type == "team" && category == "basketball"] {
    _id,
    players,
    isOfficial,
    name,
    category,
    "logo": logo.asset->url,
}`;

export const teamsVolleyQuery = groq`*[_type == "team" && category == "volleyball"]{
    _id,
    players,
    isOfficial,
    name,
    category,
    "logo": logo.asset->url,
}`;

export const fetchMatchesQuery = groq`*[_type == "match"] | order(date asc){
    _id,
    date,
    "homeTeam": homeTeam->{
        _id,
        name,
        "logo": logo.asset->url,
    },
    "awayTeam": awayTeam->{
        _id,
        name,
        "logo": logo.asset->url,
    },
    stats,
    events,
    type,
    status,
    category,
}`;

export const playerFields = `{
            _id,
            displayName,
            fullName,
            position,
            "profile": profile.asset->url,
            number,
        }`;

export const fetchMatchByIdQuery = (id: string) => groq`*[_type == "match" && _id == "${id}"]{
    _id,
    date,
    "homeTeam": homeTeam->{
        _id,
        name,
        "logo": logo.asset->url,
        players[]->${playerFields},
    },
    "awayTeam": awayTeam->{
        _id,
        name,
        "logo": logo.asset->url,
        players[]->${playerFields},
    },
    stats,
    homeTeamLineup,
    awayTeamLineup,
    events,
    status,
    category,
    fantasy,
}`;
