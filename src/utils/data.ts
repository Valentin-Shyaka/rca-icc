import { CompNav } from "./types";
import { BiFootball, BiBasketball, BiTennisBall, BiHome, } from 'react-icons/bi'
import { FaUsers } from 'react-icons/fa'
import { GiVolleyballBall } from 'react-icons/gi'
import React from "react";

export const compNavs: CompNav[] = [
    {
        id: 1,
        name: 'Overview',
        path: '/',
    },
    {
        id: 11,
        name: 'Fixtures',
        path: '/fixtures',
    },
    {
        id: 2,
        name: 'Results',
        path: '/results',
    },
    {
        id: 3,
        name: 'Table',
        path: '/table',
    },
    {
        id: 4,
        name: 'Teams',
        path: '/teams',
    },
    {
        id: 5,
        name: 'Players',
        path: '/players',
    },
    {
        id: 6,
        name: 'Stats',
        path: '/stats',
    }
]

export const events = [
    {
        name: "home",
        path: "",
        icon: React.createElement(BiHome),
    },
    {
        name: "football",
        path: "football",
          icon: React.createElement(BiFootball),
    },
    {
        name: "basketball",
        path: "basketball",
        icon: React.createElement(BiBasketball),
    },
    {
        name: "volleyball",
        path: "volleyball",
        icon: React.createElement(GiVolleyballBall),
    },
    {
        name: "debate",
        path: "debate",
        icon: React.createElement(FaUsers),
    },
    {
        name: "pingpong",
        path: "pingpong",
        icon: React.createElement(BiTennisBall),
    },
];
