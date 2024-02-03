import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { schemaTypes } from './src/cms/schemas';
import { visionTool } from '@sanity/vision';
import { media, mediaAssetSource } from 'sanity-plugin-media';

export default defineConfig({
  basePath: '/studio',
  name: 'rca-icc',
  title: 'RCA interclass competitions CMS',
  projectId: 'lxeru4rg',
  dataset: '2024',
  plugins: [structureTool(), visionTool(), media()],
  schema: {
    types: schemaTypes,
  },
});
