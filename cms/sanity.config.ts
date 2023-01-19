import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemas'

export default defineConfig({
  name: 'default',
  title: 'cms',

  projectId: process.env.PROJECT_ID || "lxeru4rg",
  dataset: process.env.DATASET || "production",

  plugins: [deskTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
})
