import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'team',
  title: 'Team',
  type: 'document',
  preview: {
    select: {
      title: 'name',
      subtitle: 'gender',
      media: 'logo',
    },
  },
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      description: 'The team name W for women clubs . ex : Y2 FC (W)',
      validation: (Rule) => Rule.required().min(3).max(100).warning('please provide a name for this team'),
    }),
    {
      name: 'logo',
      title: 'Logo',
      type: 'image',
    },
    {
      name: 'isOfficial',
      title: 'Is Official',
      type: 'boolean',
      description: 'Is this team official ?',
      initialValue: false,
    },
    {
      name: 'players',
      title: 'Players',
      type: 'array',
      of: [{ type: 'reference', to: { type: 'player' } }],
      validation: (rule) => rule.required(),
    },
    // gender
    {
      name: 'gender',
      title: 'Gender',
      type: 'string',
      options: {
        list: [
          { title: 'Male', value: 'male' },
          { title: 'Female', value: 'female' },
        ],
      },
      validation: (rule) => rule.required().warning('Please select team gender'),
    },
    // category
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      description: 'The category where the team belongs to. ex : football, basketball, ...',
      options: {
        list: [
          { title: 'Football', value: 'football' },
          { title: 'Basketball', value: 'basketball' },
          { title: 'Volleyball', value: 'volleyball' },
          { title: 'Tennis', value: 'tennis' },
          { title: 'PingPong', value: 'pingpong' },
        ],
      },
      validation: (rule) => rule.required(),
    },
    {
      name: 'coach',
      title: 'Coach',
      type: 'reference',
      to: { type: 'coach' },
    },
    {
      name: 'stats',
      title: 'Stats',
      type: 'overallTeamStats',
      description: 'Overall team stats',
    },
  ],
});
