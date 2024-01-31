import React from "react";
import { BiFootball, BiBasketball, BiTennisBall } from "react-icons/bi";
import { FaUsers } from "react-icons/fa";
import { GiVolleyballBall } from "react-icons/gi";
import { EventType } from "../types/types2";
import { MdScoreboard } from "react-icons/md";

export const timelist = [
  {
    comment: "Goal by dabagire",
    type: EventType.Goal,
    time: "1",
    id: "1",
    scorer: "dabagire",
  },
  {
    comment: "Substiturion John replaces Dabagire",
    type: EventType.Substitution,
    time: "2",
    id: "2",
    substitution: {
      off: "Dabagire",
      on: "John",
    },
  },
  {
    comment: "It looks the game is going to end in a draw",
    type: EventType.Commentry,
    time: "90",
    id: "3",
  },
  {
    comment: "Goal by dabagire",
    type: EventType.Goal,
    time: "1",
    id: "1",
    scorer: "dabagire",
  },
  {
    comment: "Substiturion John replaces Dabagire",
    type: EventType.Substitution,
    time: "2",
    id: "2",
    substitution: {
      off: "Dabagire",
      on: "John",
    },
  },
  {
    comment: "It looks the game is going to end in a draw",
    type: EventType.Commentry,
    time: "90",
    id: "3",
  },
];

export const competitions = [
  {
    id: 1,
    name: "football",
    icon: React.createElement(BiFootball, {
      size: 60,
    }),
  },
  {
    id: 2,
    name: "basketball",
    icon: React.createElement(BiBasketball, {
      size: 60,
    }),
  },
  {
    id: 3,
    name: "volleyball",
    icon: React.createElement(GiVolleyballBall, {
      size: 60,
    }),
  },
  {
    id: 4,
    name: "debate",
    icon: React.createElement(FaUsers, {
      size: 60,
    }),
  },
  {
    id: 5,
    name: "pingpong",
    icon: React.createElement(BiTennisBall, {
      size: 60,
    }),
  },
  {
    id: 6,
    name: "Play Predictor",
    icon: React.createElement(MdScoreboard, {
      size: 60,
    }),
    url: "/gaming",
    hideInGaming: true,
  },
];
