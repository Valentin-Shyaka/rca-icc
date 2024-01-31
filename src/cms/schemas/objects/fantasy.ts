import { defineType } from 'sanity';

export default defineType({
  name: 'fantasy',
  title: 'Fantasy',
  type: 'object',
  fields: [
    {
      name: 'manOfTheMatch',
      type: 'reference',
      to: [{ type: 'player' }],
    },
    {
      name: 'firstTeamToScore',
      type: 'reference',
      to: [{ type: 'team' }],
    },
  ],
});
